import { Button } from '@rneui/themed';

import { useTheme } from '@/contexts/ThemeContext';

const ButtonLoading = ({
  title,
  icon,
  onPress,
  loading = false
}: {
  title: string;
  icon?: string;
  onPress: any;
  loading?: boolean;
}) => {
  const { theme } = useTheme();

  return (
    <Button
      title={title}
      loading={loading}
      loadingProps={{
        size: 'small',
        color: theme.C42_BACKGROUND
      }}
      titleStyle={{ fontWeight: '700', color: theme.C42_BACKGROUND }}
      buttonStyle={{
        backgroundColor: theme.C42_GREEN,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 5,
        paddingVertical: 10
      }}
      containerStyle={{
        width: 150
      }}
      onPress={onPress}
      icon={
        icon
          ? {
              name: icon,
              type: 'material-icons',
              size: 20,
              color: theme.C42_BACKGROUND
            }
          : undefined
      }
    />
  );
};

export default ButtonLoading;
