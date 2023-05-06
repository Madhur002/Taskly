const About = () => {
  return (
    <div className="d-flex flex-column align-items-center about-background">
      <h1
        className="text-center"
        style={{ marginTop: "50px", fontWeight: "900", letterSpacing: "8px" }}
      >
        About Us
      </h1>
      <p
        className="text-center"
        style={{
          marginTop: "50px",
          fontWeight: "500",
          color: "white",
          width: "70vw",
          letterSpacing: "2px"
        }}
      >
        Taskly is a user-friendly web application designed for Todo-Making and
        management. With Taskly, you can create, edit, and delete your todos on
        the cloud from anywhere with an internet connection. The app is perfect
        for students, professionals, and anyone who needs to keep their thoughts
        organized and accessible. The sign-up process for Taskly is quick and
        easy, and once you're in, you can start creating todos right away. The
        app's interface is intuitive and straightforward, making it easy to
        navigate and use. You can create as many todos as you need. Editing your
        todos in Taskly is a breeze. The app also allows you to add tags to your
        todos, making it easy to find them later on. Taskly's cloud-based storage
        means you can access your todos from any device with an internet
        connection. This feature is especially helpful for those who work on
        multiple devices or need to access their todos on the go. With Taskly,
        you'll never have to worry about losing your todos or forgetting them at
        home. If you need to delete a Todo, the app makes it easy to do so. You
        can delete todos individually. Overall, Taskly is a reliable and
        efficient Todo-Making app that allows you to create, edit, and delete
        todos on the cloud. With its user-friendly interface and robust
        features, it's the perfect tool for anyone who needs to keep their
        thoughts organized and easily accessible.
      </p>
      <h4
        className="text-center"
        style={{ marginTop: "20px", color: "white", letterSpacing: "8px", paddingBottom: "150px"}}
      >
        Thanks for your Support 😍
      </h4>
    </div>
  );
};

export default About;
