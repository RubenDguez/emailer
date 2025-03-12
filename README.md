# Emailer Action

This GitHub Action sends emails using the specified SMTP service.

## Author

Argenis Ruben Dominguez

## Inputs

| Input Name       | Description                          | Required | Default           |
|------------------|--------------------------------------|----------|-------------------|
| `secrets_service`| The email service to use             | true     | gmail             |
| `secrets_host`   | The SMTP host                        | true     | smtp.gmail.com    |
| `secrets_port`   | The SMTP port                        | true     | 465               |
| `secrets_user`   | The SMTP user                        | true     |                   |
| `secrets_pass`   | The SMTP password                    | true     |                   |
| `from`           | Email address to send the email from | true     |                   |
| `to`             | Email address to send the email to   | true     |                   |
| `subject`        | Subject of the email                 | true     |                   |
| `html`           | HTML content of the email            | true     |                   |

## Usage

```yaml
name: Send Email
on: [push]

jobs:
    send_email_job:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout repository
                uses: actions/checkout@v4

            - name: Send Email
                uses: RubenDguez/emailer-action@v1
                with:
                    secrets_service: ${{ secrets.EMAIL_SERVICE }}
                    secrets_host: ${{ secrets.EMAIL_HOST }}
                    secrets_port: ${{ secrets.EMAIL_PORT }}
                    secrets_user: ${{ secrets.EMAIL_USER }}
                    secrets_pass: ${{ secrets.EMAIL_PASS }}
                    from: 'your-email@example.com'
                    to: 'recipient@example.com'
                    subject: 'Hello from GitHub Actions'
                    html: '<h1>This is a test email</h1>'
```
