import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import { toast } from 'react-toastify';
import courseStore from '../stores/courseStore';
import * as courseActions from '../actions/courseActions';


const ManageCoursePage = props => {
    const [errors, setErrors] = useState({});
    const [courses, setCourses] = useState(courseStore.getCourses());
    const [course, setCourse] = useState({
        id: null,
        slug: "",
        title: "",
        autHorId: null,
        category: ""
    });

    useEffect(() => {
        courseStore.addChangeListener(onChange); //qui ci stiamo iscrivendo allo store
        const slug = props.match.params.slug;
        if (courses.length === 0) {
            courseActions.loadCourses();
        } else if (slug) {
            setCourse(courseStore.getCourseBySlug(slug));
        }
        return () => courseStore.removeChangeListener(onChange); //pulisce quando ci spostiamo su un altra pagina

    }, [courses.length, props.match.params.slug])

    const onChange = () => {
        setCourses(courseStore.getCourses());
    }

    const handleChange = ({ target }) => { //questa sotto tra [] non è un array ma una computed property
        //la convenzione vuole che nei form si utilizzi l'attributo name per indicare la proprietà da andare a modificare (title, authorID, ecc)
        setCourse({ ...course, [target.name]: target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formIsValid()) return;
        courseActions.saveCourse(course).then(() => {
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
            <CourseForm course={course} onChange={handleChange} onSubmit={handleSubmit} errors={errors} />
        </>
    );
}

export default ManageCoursePage;
