const { exec } = require('child_process');

const pushSecretCommand =
  'npx eas secret:push --scope project --env-file ./.env --force';

exec(pushSecretCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});
