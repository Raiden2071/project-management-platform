import { CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner; 