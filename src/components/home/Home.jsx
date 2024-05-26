import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="box1">
        <div className="top-text">Knowledge and Innovation</div>
        <div className="mid-text">
          Find top-rated programs and courses tailored to each program
        </div>
        <div className="inner-box">CHECK OUR PROGRAMS</div>
      </div>

      <div className="box2">
        <div className="upper-text">600+ students mentored and counting</div>
        <div className="lower-text">
          <div>
            <div className="big-text">4</div>
            <div className="small-text">Study Programs</div>
          </div>
          <div>
            <div className="big-text">40+</div>
            <div className="small-text">Nigerian Universities</div>
          </div>
          <div>
            <div className="big-text">40+</div>
            <div className="small-text">Foreign Universities</div>
          </div>
        </div>
      </div>
      <div className="box3">
        <div className="upper-text">Only the best for the best</div>
        <div className="mid-text">
          Find the best program to gain admission into the university of your
          choice in one try
        </div>
        <div className="lower-text">
          <div className="big-text">Sciences</div>
          <div className="big-text">Social Sciences</div>
          <div className="big-text">Arts</div>
        </div>
      </div>

      <div className="last-box">
        <div className="white-box">
          <div className="font-cl">Determination and hardwork</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
