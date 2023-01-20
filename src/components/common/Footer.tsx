import { Typography, Link } from "@mui/material";

const Footer = (): JSX.Element => {
  function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return <>
    <Copyright sx={{ pt: 4 }} />
  </>;
  };
  
export default Footer;
  