import { EventEmitter } from "events";
import Dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = "change";
let _courses = [];

class CourseStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback); //il metodo .on è fornito da EventEmitter
    }

    removeChangeListener(callback) { // consentirà ai react components di annullare l'iscrizione allo store
        this.removeListener(CHANGE_EVENT, callback)
    }

    emitChange() {
        this.emit(CHANGE_EVENT)
    }

    getCourses() {
        return _courses;
    }

    getCourseBySlug(slug) {
        return _courses.find(course => course.slug === slug);
    }

}

const store = new CourseStore();

Dispatcher.register(action => {
    switch (action.actionType) {
        case actionTypes.CREATE_COURSE:
            _courses.push(action.course);
            store.emitChange();
            break;
        case actionTypes.LOAD_COURSES:
            _courses = action.courses;
            store.emitChange();
            break;
        case actionTypes.UPDATE_COURSE:
            _courses = _courses.map(el => el.id === action.course.id ? action.course : el );
            store.emitChange();
            break;
        default:
            break;

    }
})

export default store;