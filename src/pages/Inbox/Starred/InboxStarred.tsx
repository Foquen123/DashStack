import { useShallow } from 'zustand/react/shallow';
import InboxMessage from '../../../components/InboxMessage/InboxMessage';
import { useInboxStore } from '../../../store/inboxStore';
import styles from './InboxStarred.module.css';
import { useSearchParams } from 'react-router';
import { useEffect} from 'react';


function InboxStarred() {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = useInboxStore(store => store.limit);
  const inboxMessages = useInboxStore(useShallow(state => Object.values(state.messagesMap)));
  const fetchStarredMessages = useInboxStore(state => state.fetchStarredMessages);
  
  useEffect(() => {
    fetchStarredMessages(currentPage, limit, searchParams.getAll('label'));
    // setPagesCount(messagesCount);
  }, [currentPage, searchParams]);
  return (
    <div className={styles['container']}>
      {inboxMessages.map(i => <InboxMessage id={i.id} key={i.id}></InboxMessage>)}
    </div>
  );
}

export default InboxStarred;