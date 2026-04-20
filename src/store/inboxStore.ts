import { create } from 'zustand';
import { inboxMessagesExample } from '../exampleData';
import type { IInboxMessage } from '../interfaces/InboxMessage.interface';

interface InboxStore {
  messagesMap: Record<string, IInboxMessage>;
  limit: number;
  countOfItems: number;
  otherMessagesCount: {
    inbox: number;
    starred: number;
    sent: number;
    draft: number;
    spam: number;
    important: number;
    bin: number;
  };
  fetchOtherMessagesCount: () => void;
  fetchMessages: (currentPage: number, limit: number, filter: string[]) => void;
  fetchStarredMessages: (
    currentPage: number,
    limit: number,
    filter: string[],
  ) => void;
  changeStarredStatus: (id: string) => void;
}

const useInboxStore = create<InboxStore>((set) => ({
  // messagesMap: inboxMessagesExample.reduce<Record<string, IInboxMessage>>(
  //   (acc, message) => {
  //     acc[message.id] = message;
  //     return acc;
  //   },
  //   {},
  // ),

  messagesMap: {},
  limit: 10,
  countOfItems: 0,
  otherMessagesCount: {
    inbox: 0,
    starred: 0,
    sent: 0,
    draft: 0,
    spam: 0,
    important: 0,
    bin: 0,
  },

  fetchOtherMessagesCount: () => {
    set(() => ({
      otherMessagesCount: {
        inbox: inboxMessagesExample.length,
        starred: inboxMessagesExample.filter((i) => i.isStarred).length,
        bin: 0,
        draft: 0,
        important: 0,
        sent: 0,
        spam: 0,
      },
    }));
  },

  fetchMessages: (currentPage: number, limit: number, filter: string[]) => {
    const filteredMessages = inboxMessagesExample.filter((i) => {
      if (filter.length === 0) return i;
      if (filter.includes(i.label.text.toLowerCase())) {
        return i;
      }
    });
    const messagesFromServer = filteredMessages.filter((item, index) => {
      if (index >= (currentPage - 1) * limit && index < currentPage * limit) {
        return item;
      }
    });
    set(() => ({
      messagesMap: messagesFromServer.reduce<Record<string, IInboxMessage>>(
        (acc, message) => {
          acc[message.id] = message;
          return acc;
        },
        {},
      ),
      countOfItems: filteredMessages.length,
    }));
  },
  fetchStarredMessages: (
    currentPage: number,
    limit: number,
    filter: string[],
  ) => {
    const filteredMessages = inboxMessagesExample
      .filter((i) => {
        if (filter.length === 0) return i;
        if (filter.includes(i.label.text.toLowerCase())) {
          return i;
        }
      })
      .filter((m) => m.isStarred);
    const messagesFromServer = filteredMessages.filter((item, index) => {
      if (index >= (currentPage - 1) * limit && index < currentPage * limit) {
        return item;
      }
    });
    set(() => ({
      messagesMap: messagesFromServer.reduce<Record<string, IInboxMessage>>(
        (acc, message) => {
          acc[message.id] = message;
          return acc;
        },
        {},
      ),
      countOfItems: filteredMessages.length,
    }));
  },

  changeStarredStatus: (id: string) => {
    set((state) => ({
      messagesMap: {
        ...state.messagesMap,
        [id]: {
          ...state.messagesMap[id],
          isStarred: !state.messagesMap[id].isStarred,
        },
      },
    }));
  },
}));

export { useInboxStore };
