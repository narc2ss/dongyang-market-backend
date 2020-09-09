import { Context } from "koa";

export const getChat = async (ctx: Context) => {
  // io.on("connection", (socket) => {
  //   socket.on("join", ({ name, room }, callback) => {
  //     const { error, user } = addUser({ id: socket.id, name, room });
  //     if (error) return callback(error);
  //     socket.emit("message", {
  //       user: "admin",
  //       text: `${user.name} welcome to the room ${user.room}`,
  //     });
  //     socket.broadcast
  //       .to(user.room)
  //       .emit("message", { user: "admin", text: `${user.name}, has joined!` });
  //     socket.join(user.room);
  //     callback();
  //   });
  //   socket.on("sendMessage", (message, callback) => {
  //     const user = getUser(socket.id);
  //     io.to(user.room).emit("message", { user: user.name, text: message });
  //     callback();
  //   });
  //   socket.on("disconnect", () => {
  //     console.log("user had left!!!");
  //   });
  // });
  ctx.body = "dfs";
};

export const saveMessage = async (ctx: Context) => {
  ctx.body = "save message";
};

export const deleteChat = async (ctx: Context) => {
  ctx.body = "delete chat";
};
