import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  ImageBackgroundProps
} from 'react-native';

type Background42ImageProps = {
  imgURL?: string;
  children?: React.ReactNode;
} & ImageBackgroundProps;

const Background42Image: React.FC<Background42ImageProps> = ({
  imgURL,
  children,
  style,
  ...rest
}) => {
  const defaultSource = require('../../../assets/images/background.jpg');

  return (
    <ImageBackground
      source={imgURL ? { uri: imgURL } : defaultSource}
      style={[styles.bgImage, style]}
      {...rest}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  }
});

export default Background42Image;
