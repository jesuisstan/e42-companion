# Welcome to the Diary Companion Mobile App 👋

This is a React Native project created with [Expo](https://expo.dev). The Diary Companion mobile application enables you to create, store, and manage your diary notes in the [Firebase](https://firebase.google.com/) cloud. The app can be built for both Android and iOS platforms.

## Requirements:

- JavaScript. Node version >=20
- Java Development Kit (JDK). Download from [AdoptOpenJDK](https://adoptium.net/)

## Get Started

1. ### Install dependencies

   ```bash
   npm install
   ```

2. ### Set up credentials for the Application

To set up credentials for your Diary Companion application, follow these steps:

Step 1. **Create a `.env` File**

Create a `.env` file in the root folder of your project. You can use `.env.example` as a template.

Step 2. **Obtaine keystore for Android**

SHA1 key value will be usef further while setting up Firebase project (step 3).
For detailed instructions on obtaining a keystore, refer to the [Obtaining Keystore](#obtaining-keystore) section below.

Step 3. **Set Up Firebase**

- Create a new Firebase project in the [Google Firebase Console](https://console.firebase.google.com/).
- Obtain `firebaseConfig` from the Firebase Console (Web app) and paste the values into the corresponding variables in your `.env` file.

Step 4. **Add Required Files**

- Copy `google-services.json` and `keystore.jks` (if applicable) to the `[root]/credentials/` folder.
- Copy `GoogleService-Info.plist` to the `[root]/credentials/` folder.
- Copy any other necessary credentials to the `[root]/credentials/` folder.

## Build for Production

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

## Obtaining Keystore

### Using EAS Credentials

For signing your Android app, you will need a keystore. You can use the eas credentials command to manage your keystore:

#### Run the EAS Credentials Command

```bash
eas credentials
```

#### Follow the Prompts

Follow the prompts to set up your keystore through the Expo Application Services (EAS) platform.

#### Configure EAS Build

Ensure your eas.json file is configured to use the credentials stored on the EAS platform.

### Generating a Keystore Locally

Alternatively, ollow these steps to generate a keystore locally:

#### Generate a Keystore

Use the following command to generate a new keystore:

```bash
keytool -genkey -v -keystore [your_keystore_name].keystore -alias [your_alias_name] -keyalg RSA -keysize 2048 -validity 10000
```

Replace [your_keystore_name] with your desired keystore filename and [your_alias_name] with your chosen alias name.

#### Store the Keystore

Save the generated keystore.jks file in the [root]/credentials/ folder.

#### Add Keystore Information to eas.json

Add the keystore information to your eas.json file:

<pre>
{
  "android": {
    "buildType": "apk",
    "keystore": {
      "path": "./credentials/[your_keystore_name].keystore",
      "keyAlias": "[your_alias_name]"
    }
  }
}
</pre>

Replace [your_keystore_name] and [your_alias_name] with the appropriate values.

Now you're ready to build, run, and manage your Diary Companion app on Android and iOS platforms! If you encounter any issues, refer to the Expo and Firebase documentation or seek help from the community. Happy coding!
