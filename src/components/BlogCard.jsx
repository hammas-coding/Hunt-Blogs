import React from "react";
import { Card } from "react-bootstrap";
import "./styles.css";

const BlogCard = ({ blog, onDelete, onEdit, onView }) => {
  return (
    <Card className="card-main" onClick={() => onView(blog)}>
      <Card.Img variant="top" src={blog.image} className="card-image" />
      <Card.Body className="card-body">
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text className="card-description">
          {blog.description.split(" ").slice(0, 20).join(" ")}...
        </Card.Text>
        <Card.Text className="card-bottom-text-main">
          <span>{blog.name}</span> - <span>{blog.date}</span>
        </Card.Text>
        <button
          className="update-button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(blog.id);
          }}
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(blog.id);
          }}
          className="delete-button"
        >
          Delete
        </button>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
