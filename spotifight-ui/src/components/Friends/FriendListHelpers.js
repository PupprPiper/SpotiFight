import axios from 'axios';

export const requestFriend = async (myId, friendId) => {
  var body = {
    user_id: myId,
    friend_id: friendId
  };
  await axios.post('http://localhost:3000/friends/requestFriend', body);
}

export const acceptFriend = async (myId, friendId) => {
  var body = {
    user_id: myId,
    friend_id: friendId
  };
  await axios.put('http://localhost:3000/friends/acceptFriend', body);
}

export const removeFriend = async (myId, friendId) => {
  var body = {
    data: {
      user_id: myId,
      friend_id: friendId
    }
  };

  await axios.delete(
    `http://localhost:3000/friends/deleteFriend/${
      myId
    }/${friendId}`,
    body
  );
}

export const rejectFriend = async (myId, friendId) => {
  var body = {
    data: {
      user_id: myId,
      friend_id: friendId
    }
  };

  await axios.delete(
    `http://localhost:3000/friends/rejectFriend/${
      myId
    }/${friendId}`,
    body
  );
}