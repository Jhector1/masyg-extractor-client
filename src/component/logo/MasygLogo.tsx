
import MyLogo  from '../../assets/icons/masyg_logo.svg?react';


interface SvgProps {
    color?: string;
    size?: number;
  }
  
  const MasygLogo: React.FC<SvgProps> = ({ color = 'black', size = 24 }) => {
    return <MyLogo style={{ color, width: size, height: size }} />;
  };
  export default MasygLogo;