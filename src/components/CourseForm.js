import React from "react";
import TextInput from './common/TextInput';
import PropTypes from "prop-types";


function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>

      <TextInput id="title" name="title" onChange={props.onChange} value={props.course.title} label="Title" error={props.errors.title}/>

      <div className="form-group">
        <label htmlFor="author">Author</label>
        <div className="field">
          <select id="author" name="authorId" onChange={props.onChange} value={props.course.authorId || ''} className="form-control"  error={props.errors.authorId}>
            <option value="" />
            <option value="1">Cory House</option>
            <option value="2">Scott Allen</option>
          </select>
        </div>
      {props.errors.autHorId && (
        <div className="alert alert-danger">{props.errors.autHorId}</div>
        )}
      </div>

      <TextInput id="category" name="category" onChange={props.onChange} value={props.course.category} label="Category" error={props.errors.category}/>

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default CourseForm;
