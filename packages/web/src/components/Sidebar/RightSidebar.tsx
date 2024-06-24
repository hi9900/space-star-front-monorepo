'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { useEffect, useState } from 'react'

import { friendsWithBasicDataType } from '@/lib/getFriendsData'

import FriendsList from '../Friends/FriendsList'
import { ChatRightSide } from './ChatRightSide'

import styles from './Sidebar.module.css'

const DefaultRightSide = ({
  friendsList,
}: {
  friendsList: friendsWithBasicDataType[]
}) => {
  return (
    <section>
      <div className={styles['side-title']}>
        Friends
        <Link href="/dashboard/friends-list" className={styles.more}>
          More
        </Link>
      </div>
      <FriendsList items={friendsList} />
    </section>
  )
}

export default function RightSidebar({
  token,
  isChatPage,
  isGroupChatPage,
  friendsList,
}: {
  token: string
  isChatPage: boolean
  isGroupChatPage: boolean
  friendsList: friendsWithBasicDataType[]
}) {
  // FIXME: 이걸 같이 관리하는게 네브바에 있어야 함. 열고 닫을 수 있게 => 친구 아이콘으로 하기
  // const [rightSide, setRightSide] = useState(false)

  const pathName = usePathname()
  const [roomNumber, setRoomNumber] = useState<string>('')

  useEffect(() => {
    const pathParts = pathName.split('/')
    setRoomNumber(pathParts.at(-1) ?? '')
  }, [pathName])

  return (
    <section
      className={`${styles['right-side']}`}
      // className={`${styles['right-side']} ${rightSide && `${styles.active}`}`}
    >
      <div className={styles['side-wrapper']}>
        {isGroupChatPage ? (
          <ChatRightSide
            roomNumber={roomNumber}
            token={token}
            roomType="team"
          />
        ) : isChatPage ? (
          <ChatRightSide
            roomNumber={roomNumber}
            token={token}
            roomType="one-to-one"
          />
        ) : (
          <DefaultRightSide friendsList={friendsList} />
        )}
      </div>
    </section>
  )
}
