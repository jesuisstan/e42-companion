import { ReactNode, Children, FC } from 'react';
import { View, Text, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  children?: ReactNode;
};

const ThemedView: FC<ThemedViewProps> = ({
  style,
  children,
  ...otherProps
}) => {
  // Function to wrap text nodes in a Text component
  const wrapTextNodes = (nodes: ReactNode): ReactNode => {
    return Children.map(nodes, (child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return <Text>{child}</Text>;
      }
      return child;
    });
  };

  return (
    <View style={style} {...otherProps}>
      {wrapTextNodes(children)}
    </View>
  );
};

export default ThemedView;
