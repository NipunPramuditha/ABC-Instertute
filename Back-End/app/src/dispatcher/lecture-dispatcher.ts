import express = require("express");
import {LectureBoImpl} from "../business/lecture-bo-impl";
import {error} from "util";
import cors = require("cors");


const lectureDispatcher = express.Router();

lectureDispatcher.route("")
    .get((req, res) => {

        const promise = new LectureBoImpl().findAllLecture();
        promise.then(assigment=>{
            res.status(200).json(assigment);
        }).catch(error=>{
            res.status(500).send(error);
        });

    })
    .post((req, res) => {

        if (!("aid" in req.body && "fname" in req.body && "lname" in req.body && "position" in req.body && "bday" in req.body && "address" in req.body && "phone" in req.body&& "email" in req.body && "password" in req.body )){
            res.status(400).send("Invalid Request Body");
            return;
        }
        const promise = new LectureBoImpl().saveLecture(req.body);
        promise.then(status => res.status(201).json(status))
            .catch(err=>res.status(500).send(err));

    })
    .head((cors({
        exposedHeaders:['X-Count']
    })),(req, res) => {
        const t1= new Date().valueOf();// time stamp
        const promise = new LectureBoImpl().LectureCount();
        promise.then(count=>{
            res.append("X-Count",count+"");
            res.sendStatus(200);
        }).catch(error=>{
            res.status(500);
        });
    })
;


lectureDispatcher.route("/:id")
    .get((req, res) => {

        const promise = new LectureBoImpl().findLecture(req.params.id);
        promise.then(assigement=>{

            if (assigement.length > 0){
                res.status(200).send(assigement[0]);
            }else{
                res.sendStatus(404);
            }

        }).catch(error=>{
            res.status(500).send(error);
        });

    })
    .delete((req, res) => {

        const promise = new LectureBoImpl().deleteLecture(req.params.id);
        promise.then(status=>{

            if (status){
                res.status(200).send(true);
            }else{
                res.sendStatus(404);
            }

        }).catch(error=>{
            res.status(500).send(error);
        });

    })
    .put((req, res) => {

        if (!("aid" in req.body && "fname" in req.body && "lname" in req.body && "position" in req.body && "bday" in req.body && "address" in req.body && "phone" in req.body&& "email" in req.body && "password" in req.body )){
            res.status(400).send("Invalid Request Body");
            return;
        }

        if (req.body.id !== req.params.id){
            res.status(400).send("Mismatched assigment ID");
            return;
        }

        const promise = new LectureBoImpl().updateLecture(req.body);
        promise.then(status=>{

            if (status){
                res.status(200).send(true);
            }else{
                res.sendStatus(404);
            }

        }).catch(error=>{
            res.status(500).send(error);
        });

    });

export default lectureDispatcher;
