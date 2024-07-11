import { Request, Response } from 'express';
import User, {IUser} from '../models/user';
import { Types } from 'mongoose';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'Error registering user' });
    }
};

export const listUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error listing users' });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
      const user = await User.findById(id).populate('friends');
      if (user) {
          res.status(200).json(user);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Error retrieving user' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
      const user = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
      if (user) {
          res.status(200).json(user);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
  }
};

export const addFriend = async (req: Request, res: Response): Promise<void> => {
  const { id, friendId } = req.params;
  try {
      const user = await User.findById(id) as IUser;
      const friend = await User.findById(friendId) as IUser;
      if (user && friend) {
          const friendObjectId = new Types.ObjectId(friendId);
          if (!user.friends.includes(friendObjectId)) {
              user.friends.push(friendObjectId);
              await user.save();
              res.status(200).json(user);
          } else {
              res.status(400).json({ message: 'Friend already added' });
          }
      } else {
          res.status(404).json({ message: 'User or friend not found' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Error adding a friend' });
  }
};

export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  const { id, friendId } = req.params;
  try {
      const user = await User.findById(id) as IUser;
      if (user) {
          user.friends = user.friends.filter((friend) => friend.toString() !== friendId);
          await user.save();
          res.status(200).json(user);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Error deleting a friend' });
  }
};


export const listFriends = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
      const user = await User.findById(id).populate('friends');
      if (user) {
          res.status(200).json(user.friends);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Error listing friends' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      if (user.password !== password) {
        res.status(400).json({ error: 'Invalid credentials' });
        return;
      }
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
  };