import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import * as courseApi from '../api/courseApi';
import { toast } from 'react-toastify';


const ManageCoursePage = props => {
    const [errors, setErrors] = useState({});
    const [course, setCourse] = useState({
        id: null,
        slug: "",
        title: "",
        autHorId: null,
        category: ""
    });

    useEffect(() => {
        const slug = props.match.params.slug
        if(slug) courseApi.getCourseBySlug(slug).then(_course => setCourse(_course))
    },[props.match.params.slug])

    const handleChange = ({ target }) => { //questa sotto tra [] non è un array ma una computed property
        //la convenzione vuole che nei form si utilizzi l'attributo name per indicare la proprietà da andare a modificare (title, authorID, ecc)
        setCourse({ ...course, [target.name]: target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formIsValid()) return;
        courseApi.saveCourse(course).then(() => {
            props.history.push("/courses");
            toast.success('Course saved.')
        })
    }

    const formIsValid = () => {
        const _errors = {};
        if (!course.title) _errors.title = 'Title is required';
        if (!course.authorId) _errors.authorId = 'autHorId is required';
        if (!course.category) _errors.category = 'Category is required';
        setErrors(_errors);
        return Object.keys(_errors).length === 0;
    }

    return (
        <>
            <h2>Manager Course</h2>
            {props.match.params.slug}
            <CourseForm course={course} onChange={handleChange} onSubmit={handleSubmit} errors={errors}/>
        </>
    );
}

export default ManageCoursePage;
