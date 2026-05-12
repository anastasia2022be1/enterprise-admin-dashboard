import { Link } from 'react-router-dom';

import { PageHeader } from '../../components/ui/PageHeader';

export const NotFoundPage = () => (
  <>
    <PageHeader title="Page not found" description="The page you requested does not exist." />
    <p>
      <Link to="/dashboard">Back to dashboard</Link>
    </p>
  </>
);
