import dispatcher from "../appDispatcher";
import * as courseApi from '../api/courseApi';
import actionType from './actionTypes';

export function saveCourse(course){
   return courseApi.saveCourse(course).then(savedCourse => { //aggiungiamo il return coì chi chiamerà questa funzione verrà avvisato quando la promise si risolverà
    //Ciao Dispatcher! vai a dire a tutti gli stores che un corso è appena stato creato
    dispatcher.dispatch({
            actionType: course.id ? actionType.UPDATE_COURSE : actionType.CREATE_COURSE, //per i tipi nelle actions è meglio avere un file dedicato(json) ed importarlo in questo modo
            course: savedCourse
        });    
    })
}

export function loadCourses(){
    return courseApi.getCourses().then(courses => { //aggiungiamo il return coì chi chiamerà questa funzione verrà avvisato quando la promise si risolverà
     //Ciao Dispatcher! vai a dire a tutti gli stores che un corso è appena stato creato
     dispatcher.dispatch({
             actionType: actionType.LOAD_COURSES, //per i tipi nelle actions è meglio avere un file dedicato(json) ed importarlo in questo modo
             courses: courses
         });    
     })
 }

 export function deleteCourse(id){
    return courseApi.deleteCourse(id).then(() => {      
     dispatcher.dispatch({
             actionType: actionType.DELETE_COURSE, 
             id: id
         });    
     })
 }