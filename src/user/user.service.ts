import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";
import { Op } from "sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    return user;
  }

  async findBySearch(search: string): Promise<any> {
    const users = await User.findAll({
      where: { username: { [Op.like]: `%${search}%` } },
    });
    return users;
  }

  async createUser({ email, username, password }: CreateUserDto): Promise<any> {
    const user = await User.create({
      email,
      username,
      password,
    });
    return user;
  }

  async updateUser(user: any): Promise<any> {
    try {
      const updatedUser = await User.update(user, { where: { id: user.id } });
      return updatedUser;
    } catch {
      return {
        statusCode: "409",
        message: "This username is already in use.",
      };
    }
  }

  async getFriends({ id }) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new NotFoundException("User not found.");

      const friends = await User.findAll({
        where: { id: user.friends }, // Fetch friends by their IDs
      });

      return {
        statusCode: "200",
        friends,
      };
    } catch (error) {
      return {
        statusCode: "404",
        message: "Friends not found.",
      };
    }
  }

  async setFriend({ id, otherId, status }) {
    const firstUser = await this.findById(id);
    const secondUser = await this.findById(otherId);

    if (!firstUser || !secondUser) {
      throw new NotFoundException("User not found.");
    }

    if (
      (firstUser.blocked && firstUser.blocked.includes(otherId)) ||
      (secondUser.blocked && secondUser.blocked.includes(id))
    ) {
      return {
        status: "406",
        message: "You cannot do this. You are blocked.",
      };
    }

    if (status) {
      if (firstUser.friends.includes(otherId)) {
        return {
          statusCode: "409",
          message: "You are already friends.",
        };
      }

      this.setRequest({ id: otherId, otherId: id, status: false });

      // Updating friends for both users
      firstUser.friends = [...firstUser.friends, otherId];
      secondUser.friends = [...secondUser.friends, id];

      await firstUser.save();
      await secondUser.save();
    } else {
      firstUser.friends = firstUser.friends.filter(
        (friendId) => friendId !== otherId
      );
      secondUser.friends = secondUser.friends.filter(
        (friendId) => friendId !== id
      );

      await firstUser.save();
      await secondUser.save();
    }

    return {
      statusCode: "200",
      message: "Friendship updated successfully.",
    };
  }

  async getRequests({ id }) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new NotFoundException("User not found.");

      const requests = await User.findAll({
        where: { id: user.requests }, // Fetch request senders by their IDs
      });

      return {
        statusCode: "200",
        requests,
      };
    } catch (error) {
      return {
        statusCode: "404",
        message: "Requests not found.",
      };
    }
  }

  async setRequest({ id, otherId, status }) {
    const firstUser = await this.findById(id);
    const secondUser = await this.findById(otherId);

    if (!firstUser || !secondUser)
      throw new NotFoundException("User not found.");

    if (status) {
      if (secondUser.requests.includes(id)) {
        return {
          statusCode: "409",
          message: "You already sent a request to this user.",
        };
      }

      secondUser.requests = [...secondUser.requests, id];
      await secondUser.save();
    } else {
      secondUser.requests = secondUser.requests.filter(
        (requestId) => requestId !== id
      );
      await secondUser.save();
    }

    return {
      statusCode: "200",
      message: "Request updated successfully.",
    };
  }

  async getBlocked({ id }) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new NotFoundException("User not found.");

      const blocked = await User.findAll({
        where: { id: user.blocked }, // Fetch blocked users by their IDs
      });

      return {
        statusCode: "200",
        blocked,
      };
    } catch (error) {
      return {
        statusCode: "404",
        message: "Blocked users not found.",
      };
    }
  }

  async setBlocked({ id, otherId, status }) {
    const firstUser = await this.findById(id);
    const secondUser = await this.findById(otherId);

    if (!firstUser || !secondUser)
      throw new NotFoundException("User not found.");

    if (status) {
      if (firstUser.blocked.includes(otherId)) {
        return {
          statusCode: "409",
          message: "This user is already blocked.",
        };
      }

      await this.setFriend({ id, otherId, status: false }); // Unfriend
      await this.setRequest({ id, otherId, status: false }); // Remove request

      firstUser.blocked = [...firstUser.blocked, otherId];
      await firstUser.save();
    } else {
      firstUser.blocked = firstUser.blocked.filter(
        (blockedId) => blockedId !== otherId
      );
      await firstUser.save();
    }

    return {
      statusCode: "200",
      message: "Block status updated successfully.",
    };
  }
}
