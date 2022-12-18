import React, { useState } from 'react';
import referStyles from '../styles/Refer.module.css'
import axios from 'axios';
const Referaction = ({linkavailable,postingId,userId,postName,postOrganization,questions,username,useremail,reward}) => {
    const [resumefile,setResumefile] = useState("")

    const handleSubmit = (event)=>{
        event.preventDefault()
        let questionnaireArray = []
        for(let i=0;i<questions.length;i++){
            const questionnaire = new Object()
            questionnaire.question = questions[i]
            questionnaire.response = event.target[4+i].value
            questionnaireArray.push(questionnaire)
        }
        try {
            axios.post("https://copper-chipmunk-gown.cyclic.app/referral",{
                given_name: event.target[0].value,
                surname: event.target[1].value,
                email_address: event.target[2].value,
                linkedin_url: event.target[3].value,
                posting_id: postingId,
                referred_by: {
                    referrerId: userId,
                    referrerEmail: useremail,
                    referrerName: username
                },
                post_name: postName,
                post_organization: postOrganization,
                questionnaire: questionnaireArray,
                pipeline:{
                    candidate_referred: "In Progress"
                },
                resume: resumefile,
                reward: reward
            })
            .then((response)=>{
                if(response.status===200){
                    alert("Candidate has been successfully referred")
                    console.log(response.data)
                }
                else{
                    alert("Failed to refer candidate")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const convertToBase64 = (e)=>{
        let selectedFile = e.target.files;
        //Check File is not Empty
        if (selectedFile.length > 0) {
            // Select the very first file from list
            const fileToLoad = selectedFile[0];
            // FileReader function for read the file.
            const fileReader = new FileReader();
            // Onload of file read the file content
            fileReader.onload = function(fileLoadedEvent) {
                let base64 = fileLoadedEvent.target.result;
                setResumefile(base64)
                console.log("hi")
                // Print data in console
            };
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
        }
    }
    console.log(resumefile)

    return (
        <div className={referStyles.referContainer}>
            <form id="referral-form" className={referStyles.referform} onSubmit={handleSubmit}>
                <div className={referStyles.referdiv}>
                    <div className={referStyles.referinput}>
                        <label htmlFor='given-name'>Candidate Given Name<span style={{color:"red"}}>*</span></label>
                        <input type="text" id="given-name" required placeholder='E.g- John'></input>
                    </div>
                    <div className={referStyles.referinput}>
                        <label htmlFor='given-name'>Candidate Surname<span style={{color:"red"}}>*</span></label>
                        <input type="text" id="given-name" required placeholder='E.g- Doe'></input>
                    </div>
                </div>
                <div className={referStyles.referdiv}>
                    <div className={referStyles.referinput}>
                        <label htmlFor='given-name'>Candidate Email<span style={{color:"red"}}>*</span></label>
                        <input type="email" id="given-name" required placeholder='E.g- johndoe@abc.com'></input>
                    </div>
                    <div className={referStyles.referinput}>
                        <label htmlFor='given-name'>Candidate LinkedIn<span style={{color:"red"}}>*</span></label>
                        <input type="text" id="given-name" required placeholder='Paste full URL'></input>
                    </div>
                </div>
                {questions.map((question,index)=>{
                    return(
                        <div className={referStyles.referinput} key={index}>
                            <label htmlFor=''>{question}<span style={{color:"red"}}>*</span></label>
                            <textarea required style={{height:"80px"}}></textarea>
                        </div>
                    )
                })}
                <div className={referStyles.referfile}>
                    <label htmlFor='resume-input'>Attach Resume <span>{'Should be < 1MB and ending with .pdf '}</span><span style={{color:"red"}}>*</span></label>
                    <input type="file" id="resume-input" required onChange={convertToBase64} className={referStyles.custom_file_input}/>
                </div>
                <div className={referStyles.referbtn}>
                    <input type='submit' value='Refer Candidate'></input>
                </div>
            </form>
            <div className={referStyles.or} style={linkavailable === 'true' ? {display:"flex"} : {display:"none"}}><p>OR</p></div>
            <div className={referStyles.link} style={linkavailable === 'true' ? {display:"flex"} : {display:"none"}}>
                <p>Copy and send this link to candidate.</p>
                <p>{`http://localhost:3000/candidate/${userId}?posting=${postingId}`}</p>
            </div>
        </div>
    );
};

export default Referaction;