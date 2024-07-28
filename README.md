# Welcome to the E42 Companion Mobile App 👋

This is a React Native project created with [Expo](https://expo.dev). The E42 Companion mobile application enables you to retrieve the information of 42 students,
using the 42 API.
The app can be built for both Android and iOS platforms.

## Requirements:

- JavaScript. Node version >=20
- Java Development Kit (JDK). Download from [AdoptOpenJDK](https://adoptium.net/)
- EAS [Expo](https://expo.dev) account

## Get Started

1. ### Install dependencies

   ```bash
   npm install
   ```

2. ### Set up credentials for the Application

To set up credentials for your E42 Companion application, follow these steps:

Step 1. **Obtaine 42API credentials**

Create new application or use already existing one at [42Intra](https://profile.intra.42.fr/oauth/applications).

Step 2. **Create a `.env` File**

Create a `.env` file in the root folder of your project, use `.env.example` as a template.
Copy obtained credential to your `.env` file to fill the requied fields.

## Build for Production

0. Replace the eas projectId in `app.config.js` file with your own.

1. **For Android**

   Run the following command to build the app for production:

   ```bash
   npm run build:a:c:prod
   ```

   This command performs the following steps:

   - Runs the secrets script: `npm run secrets`
   - Builds the app using Expo Application Services (EAS): `npx eas build -p android --profile production`

2. **Download and Install**

   After the build completes, download the APK from the Expo build service, then install it on your mobile phone.

## Build for Development and run

To run the app in development mode, use the following command:

```bash
 npm run build:a:c:dev
```

This command runs the secrets script and builds the app using the development profile.

After the build completes, download the APK from the Expo build service, then install it on your mobile phone.

Start the dev mode application:

```bash
    npm run start:build
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).
