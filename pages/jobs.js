import { useRouter } from 'next/router';
import JobsPage from '../components/JobsPage';

export default function Jobs({ user }) {
  return <JobsPage user={user} />;
}
