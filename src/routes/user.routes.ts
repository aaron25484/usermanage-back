import { Router } from 'express';
import { registerUser, listUsers, deleteUser, addFriend, getUser, listFriends, removeFriend, updateUser } from '../controllers/user.controllers';

const userRouter: Router = Router();

userRouter.post('/users', registerUser);
userRouter.get('/users', listUsers);
userRouter.delete('/users/:id', deleteUser);
userRouter.get('/users/:id', getUser);
userRouter.put('/users/:id', updateUser);
userRouter.put('/users/:id/friends/:friendId', addFriend);
userRouter.delete('/users/:id/friends/:friendId', removeFriend);
userRouter.get('/users/:id/friends', listFriends);

export default userRouter;
