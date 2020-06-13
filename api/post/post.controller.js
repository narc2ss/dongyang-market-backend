import db from "../../models";

export const createPost = async (req, res, next) => {
  const { id, postTitle, postPrice, postDescription, postImages } = req.body;

  let user = null;

  try {
    user = db.User.findOne({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(e);
    next(e);
  }

  if (!user) res.status(204).json({ message: "존재하지 않는 사용자 입니다." });

  try {
    await db.Post.create({
      postTitle,
      postPrice,
      postDescription,
      postImages,
      UserId: id,
    });
    await res.json({ message: "게시글 등록 완료" });
  } catch (e) {
    next(e);
  }
};

export const getPost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await db.Post.findOne({
      where: {
        id,
      },
    });
    res.send(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const updatePost = async (req, res, next) => {
  const {
    id,
    postTitle,
    postPrice,
    postDescription,
    postImages,
    postState,
  } = req.body;

  let post = null;
  try {
    post = await db.Post.findOne({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }

  if (!post) res.status(201).json({ message: "등록된 게시글이 아닙니다." });

  const newData = {
    postTitle,
    postPrice,
    postDescription,
    postImages,
    postState,
  };

  try {
    await db.Post.update(newData, {
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }

  res.status(200).json({ message: "수정완료" });
};

export const deletePost = async (req, res, next) => {
  const { id } = req.body;

  try {
    await db.Post.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }

  res.status(200).json({ message: "게시글이 삭제되었습니다." });
};
