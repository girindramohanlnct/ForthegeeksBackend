const Post = require("../models/post");
const nodemailer = require("nodemailer");
const Message = require("../models/message");

exports.createPost = async (req, res, next) => {
  console.log("hello");

  try {
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      keyword: req.body.keyword,
      type: req.body.type,
      content: req.body.content,
      videoUrl: req.body.videoUrl,
      nextPage: req.body.nextPage,
      previousPage: req.body.previousPage,
      subject: req.body.subject,
      subTopic: req.body.subTopic,
    });
    const result = await post.save();
    console.log("waah ", result);
    if (!result) {
      res.status(400).json({
        messege: "post is not created",
        status: false,
      });
    } else {
      res.status(201).json({
        messege: "post is not created",
        post: {
          title: req.body.title,
          description: req.body.description,
          content: req.body.content,
          keyword: req.body.keyword,
          type: req.body.type,
          videoUrl: req.body.videoUrl,
          nextPage: req.body.nextPage,
          previousPage: req.body.previousPage,
          subject: req.body.subject,
          subTopic: req.body.subTopic,
        },
      });
      console.log("saved");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      messege: "post is not created",
      status: false,
    });
  }
};

exports.getPost = async (req, res, next) => {
  console.log("fetching.....");
  try {
    const result = await Post.find();
    console.log("waah ", result);
    if (!result) {
      res.status(400).json({
        messege: "post is not fetched",
        status: false,
      });
    } else {
      res.status(200).json({
        messege: "post fetched",
        posts: result,
      });
      console.log("saved");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      messege: "post is not fetched",
      status: false,
    });
  }
};

exports.getType = async (req, res, next) => {
  try {
    const result = await Post.find().distinct("type");
    console.log("waah ", result);

    if (!result) {
      res.status(400).json({
        messege: "post is not fetched",
        status: false,
      });
    } else {
      res.status(200).json({
        messege: "post fetched",
        posts: result,
      });
      console.log("saved");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      messege: "post is not fetched",
      status: false,
    });
  }
};

exports.getContent = async (req, res, next) => {
  console.log("topics ",req.params.topic);
  try {
    let contents = await Post.find({
      subject: req.params.topic,
      previousPage: "NA",
    });
    console.log(contents);
    if (!contents || contents === null) {
      console.log("fetched................")
      return res.status(400).json({
        messege: "post is not fetched",
        status: false,
      });
    }
    let allPosts = await Post.find();
    let subTopics = await Post.find({ subject: req.params.topic }).distinct(
      "subTopic"
    );
    if (contents && allPosts && subTopics) {
      res.status(200).json({
        messege: "post is fetched",
        contents: contents[0],
        allPost: allPosts,
        subTopics: subTopics,
      });
    } else {
      res.status(400).json({
        messege: "post is not fetched",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      messege: "post is not fetched",
      status: false,
    });
  }
};

exports.getPostForUpdate = async (req, res, next) => {
  // console.log("topicsId ",req.params.topicId);
  try {
    let content = await Post.findById({ _id: req.params.topicId });
    console.log(content.subTopic);
    if (content) {
      res.status(200).json({
        messege: "post is fetched",
        content: content,
      });
    } else {
      res.status(400).json({
        messege: "post is not fetched",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      messege: "post is not fetched",
      status: false,
    });
  }
};

exports.updatePost = async (req, res, next) => {
  console.log("topicsId edit   ", req.params.topicId);
  try {
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      keyword: req.body.keyword,
      type: req.body.type,
      content: req.body.content,
      videoUrl: req.body.videoUrl,
      nextPage: req.body.nextPage,
      previousPage: req.body.previousPage,
      subject: req.body.subject,
      _id: req.params.topicId,
      subTopic: req.body.subTopic,
    });
    console.log(post.description);

    let content = await Post.updateOne({ _id: req.params.topicId }, post);
    console.log(content.description);
    if (content) {
      res.status(200).json({
        messege: "post is fetched",
        content: content,
      });
    } else {
      res.status(400).json({
        messege: "post is not fetched",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      messege: "post is not fetched",
      status: false,
    });
  }
};

exports.getContentByTitle = async (req, res, next) => {
  try {
    console.log(req.params.title);
    let contents = await Post.find({ title: req.params.title });

    if (contents) {
      console.log("title ", contents[0].title);
      res.status(200).json({
        messege: "post is fetched",
        contents: contents[0],
      });
    } else {
      res.status(400).json({
        messege: "post is not fetched",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      messege: "post is not fetched",
      status: false,
    });
  }
};

exports.sendMessage = async (req, res, next) => {
  let subject = req.body.subject;
  let to = req.body.email;
  let message = req.body.message;
  let phone = req.body.phone;
  let name = req.body.name;

  let msg = new Message({
    subject: subject,
    to: to,
    message: message,
    phone: phone,
    name: name,
  });

  try {
    let result = await msg.save();
    if (result == null) {
      return res.status(400).json({
        messege: "email not sent",
        status: false,
      });
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "techenovators@gmail.com",
        pass: "Mohan@123",
      },
    });

    transporter.sendMail(
      {
        to: to,
        from: "girindramohan0@gmail.com",
        subject: subject,
        text: message,
        html: `<p>${message}</p>`,
      },
      (err, info) => {
        if (err) {
          return res.status(400).json({
            messege: "email not sent",
            status: false,
          });
        } else {
          return res.status(200).json({
            messege: "email sent",
            status: true,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      messege: "email not sent",
      status: false,
    });
  }
};
