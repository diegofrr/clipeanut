import toast from 'react-hot-toast';

type CustomToastProps = {
  isDarkMode?: boolean;
  radius?: 'full' | number;
  icon?: JSX.Element;
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
};

export function myToast(
  message: string,
  { icon, position = 'bottom-center', isDarkMode = false, radius = 10 }: CustomToastProps = {}
) {
  toast(message, {
    icon,
    position,
    duration: 2000,
    style: {
      borderRadius: radius === 'full' ? '9999px' : radius,
      background: isDarkMode ? '#000' : '#bbb',
      border: '1px solid #111',
      color: isDarkMode ? '#fff' : '#333'
    }
  });
}
