import React from "react";
import _ from "lodash";

import { markdownify, Link, htmlToReact } from "../utils";

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  sendEmail(event) {
    event.preventDefault();
    const { name, email, message } = this.state;
    if (!name || !email || !message) {
      alert("Please provide all inputs to form before submitting");
      return;
    }

    fetch("/.netlify/functions/send-mail", {
      method: "POST",
      body: JSON.stringify({
        email,
        name,
        message
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log(response);
        this.setState({ submitted: true });
        return response;
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { submitted } = this.state;
    return (
      <section
        id={_.get(this.props, "section.section_id")}
        className={
          "wrapper " +
          _.get(this.props, "section.background_style") +
          " fade-up"
        }
      >
        <div className="inner">
          <div className="split style1">
            <section>
              {submitted ? (
                <div className="fields">
                  <div className="field">
                    Thank you for reaching out! I will be in touch.
                  </div>
                </div>
              ) : (
                <React.Fragment>
                  <h2>{_.get(this.props, "section.title")}</h2>
                  {markdownify(_.get(this.props, "section.text"))}
                  <div className="fields">
                    <div className="field half">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="field half">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="message">Message</label>
                      <textarea
                        name="message"
                        id="message"
                        rows="5"
                        value={this.state.message}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <ul className="actions" style={{ marginTop: "2em" }}>
                    <button
                      onClick={this.sendEmail}
                      className="button primary submit"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </ul>
                </React.Fragment>
              )}
            </section>

            <section>
              <ul className="contact">
                {_.get(this.props, "section.contact_list") &&
                  _.map(
                    _.get(this.props, "section.contact_list"),
                    (item, item_idx) => (
                      <li key={item_idx}>
                        <h3>{_.get(item, "title")}</h3>
                        {_.get(item, "url") ? (
                          <Link to={_.get(item, "url")}>
                            {_.get(item, "text")}
                          </Link>
                        ) : (
                          <span>
                            {htmlToReact(
                              _.get(item, "text").replace(/\n/g, "<br />")
                            )}
                          </span>
                        )}
                      </li>
                    )
                  )}
                {_.get(this.props, "section.social") && (
                  <li>
                    <h3>{_.get(this.props, "section.social.title")}</h3>
                    <ul className="icons">
                      {_.map(
                        _.get(this.props, "section.social.social_icons"),
                        (item, item_idx) => (
                          <li key={item_idx}>
                            <Link
                              target="_blank"
                              to={_.get(item, "url")}
                              className={_.get(item, "icon")}
                            >
                              <span className="label">
                                {_.get(item, "title")}
                              </span>
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </li>
                )}
              </ul>
            </section>
          </div>
        </div>
      </section>
    );
  }
}
