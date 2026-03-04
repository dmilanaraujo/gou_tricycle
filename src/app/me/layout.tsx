import * as React from 'react';
import {isProfileActive} from '@/lib/utils';
import {redirect} from 'next/navigation';
import {getProfileCachedData} from '@/lib/actions/profile';
import {ProfileProvider} from '@/providers/profile-provider';
import ProfileNotFound from '@/components/layout/profile-not-found';
import {getBusinessesCachedData} from '@/lib/actions/business';

interface ManagerLayoutProps {
  children: React.ReactNode;
}

export default async function ManagerLayout({ children }: Readonly<ManagerLayoutProps>) {
  const profile = await getProfileCachedData();
  if (!profile) {
      return <ProfileNotFound/>
  }

  if (!isProfileActive(profile)) {
      redirect('/inactive-profile')
  }
  
  const businesses = await getBusinessesCachedData({
      only_logged_user: !profile?.is_admin,
      limit: 100
  });
  
  return (
      <ProfileProvider profile={profile} businesses={businesses}>
          {children}
      </ProfileProvider>
  )
}
