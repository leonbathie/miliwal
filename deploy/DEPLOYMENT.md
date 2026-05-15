# VPS Deployment

End-to-end setup for auto-deploying the app to a VPS via GitHub Actions.

## TL;DR

1. Generate a dedicated SSH key for deploy.
2. Copy the public key to the VPS `~/.ssh/authorized_keys`.
3. Add 5 secrets in the GitHub repo (Settings → Secrets and variables → Actions).
4. Install the Nginx config from `nginx.example.conf` once on the VPS.
5. Push to `main` — `.github/workflows/deploy.yml` does the rest.

---

## 1. Generate a deploy-only SSH key

On your local machine:

```bash
ssh-keygen -t ed25519 -C "miliwal-deploy" -f ~/.ssh/miliwal_deploy
# Press Enter twice for no passphrase (required for non-interactive CI).
```

You now have:
- `~/.ssh/miliwal_deploy`     ← **private** key (will go to GitHub Secrets)
- `~/.ssh/miliwal_deploy.pub` ← public key (goes on the VPS)

## 2. Authorize the key on the VPS

```bash
ssh-copy-id -i ~/.ssh/miliwal_deploy.pub user@your-vps-ip
# Or manually:
cat ~/.ssh/miliwal_deploy.pub | ssh user@your-vps-ip 'cat >> ~/.ssh/authorized_keys'
```

Verify it works *without* a password:

```bash
ssh -i ~/.ssh/miliwal_deploy user@your-vps-ip 'echo ok'
```

## 3. Create the target directory on the VPS

Pick a path dedicated to this app. Anything in it will be replaced on every deploy (`rsync --delete`).

```bash
sudo mkdir -p /var/www/miliwal
sudo chown $USER:$USER /var/www/miliwal
```

## 4. Add GitHub Secrets

Go to https://github.com/leonbathie/miliwal/settings/secrets/actions and create:

| Name           | Value                                                         |
| -------------- | ------------------------------------------------------------- |
| `VPS_HOST`     | `your-vps-ip` or `your-domain.example`                        |
| `VPS_USER`     | The SSH login user (e.g. `deploy`, `ubuntu`, `root`)          |
| `VPS_PATH`     | `/var/www/miliwal` (must match Nginx `root`)                  |
| `VPS_SSH_KEY`  | **The full content of `~/.ssh/miliwal_deploy`** — including the `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END…` lines. |
| `VPS_PORT`     | *(optional)* SSH port if not 22                               |
| `RELOAD_NGINX` | *(optional)* Set to `true` to `systemctl reload nginx` at the end of each deploy. Requires the SSH user to have passwordless sudo for that command. |

## 5. Install the Nginx config (one-time)

On the VPS:

```bash
sudo cp nginx.example.conf /etc/nginx/sites-available/miliwal.conf
# Edit it: change `your-domain.example` and `root` if needed
sudo nano /etc/nginx/sites-available/miliwal.conf

sudo ln -s /etc/nginx/sites-available/miliwal.conf /etc/nginx/sites-enabled/
sudo nginx -t          # validate
sudo systemctl reload nginx
```

For HTTPS (recommended):

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.example
```

Certbot will rewrite the Nginx config to add the 443 listener and HTTP → HTTPS redirect.

## 6. Push and watch

```bash
git push origin main
```

Then go to **Actions → Deploy to VPS** and watch the job. After ~1-2 min the new build is live at your domain.

You can also trigger a manual deploy from the Actions tab → "Deploy to VPS" → "Run workflow".

## Optional: passwordless sudo for Nginx reload

If `RELOAD_NGINX=true`, the deploy user must be able to reload Nginx without a password:

```bash
echo "deploy ALL=(ALL) NOPASSWD: /bin/systemctl reload nginx" | sudo tee /etc/sudoers.d/deploy-nginx
sudo chmod 440 /etc/sudoers.d/deploy-nginx
```

Replace `deploy` with the username matching `VPS_USER`.

## Troubleshooting

- **Permission denied (publickey)** → the `VPS_SSH_KEY` secret is wrong or the public key isn't in `authorized_keys`. Verify with `ssh -i …` from local.
- **rsync: failed to set times on …: Operation not permitted** → SSH user doesn't own the target dir. Run `sudo chown -R $USER /var/www/miliwal`.
- **Files deploy but site returns 404** → Nginx `root` doesn't match `VPS_PATH`, or `try_files` is wrong. Check `sudo nginx -t` and the server block.
- **Service worker keeps serving an old version** → expected for the first reload after a deploy; the SW will detect the new build and update. Force-refresh once (Ctrl+Shift+R) to confirm.
