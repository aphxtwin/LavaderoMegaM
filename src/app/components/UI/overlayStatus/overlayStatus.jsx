import { CircularProgress, CheckCircle, Error } from '@mui/icons-material';

function OverlayStatus({ status, errorMessage }) {
  if (!status) return null;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      bgcolor={status === 'error' ? 'rgba(255, 0, 0, 0.8)' : 'rgba(0, 255, 0, 0.8)'} 
    >
      {status === 'loading' && <CircularProgress color="primary" />}
      {status === 'success' && <CheckCircle fontSize="large" />}
      {status === 'error' && (
        <Box textAlign="center">
          <Error fontSize="large" />
          <Typography>{errorMessage}</Typography>
        </Box>
      )}
    </Box>
  );
}

