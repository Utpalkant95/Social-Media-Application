import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function GroupAvatars() {
  return (
    <AvatarGroup >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 16, height: 16 }} />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"  sx={{ width: 16, height: 16 }} />
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg"  sx={{ width: 16, height: 16 }} />
      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg"  sx={{ width: 16, height: 16 }} />
      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg"  sx={{ width: 16, height: 16 }} />
    </AvatarGroup>
  );
}