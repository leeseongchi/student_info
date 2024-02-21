import React, { useEffect, useRef, useState } from 'react';

function StudentArrayPage2(props) {
    console.log(10.1234.toFixed(2));
    const student = {
        id: 0,
        name: "",
        score: 0
    }

    const [ studentList, setStudentList ] = useState([]);
    const [ inputValue, setInputValue ] = useState(student);
    const [ updateId, setUpdateId ] = useState();
    const [ refresh, setRefresh ] = useState(false);

    const staticId = useRef(0);
    
    useEffect(() => {
        let studentTotal = 0;
        console.log(studentList)
        for(let i = 0; i < studentList.length; i++) {
            studentTotal += parseInt(studentList[i].score);
        }
        if(refresh) {
            setScoreData({
                total: studentTotal,
                avg : (studentTotal / studentList.length).toFixed(2)
            });
        }
        setRefresh(true);
    }, [studentList]);

    const [ scoreData, setScoreData ] = useState({
        total: 0,
        avg: 0
    });


    useEffect(() => {
        console.log(scoreData)
    }, [scoreData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setInputValue({
            ...inputValue,
            [name]: value
        });       
    }

    const handleAddClick = () => {
        const student = {
            ...inputValue,
            id: staticId.current += 1
        };

        setStudentList([...studentList, student]);
    }

    const handleUpdateClick = (id) => {
        setUpdateId(id);
        setInputValue(studentList.filter(student => student.id === id)[0]);
    }

    const handleDeleteClick = (id) => {
        setStudentList([...studentList.filter(student => student.id != id)]);
    }

    const handleUpdateSubmitClick = () => {

        const findIndex =
            studentList.indexOf(studentList.filter(student => student.id === updateId)[0]);
        const updateStudentList = [...studentList];

        updateStudentList[findIndex] = inputValue;
        setStudentList(updateStudentList);
        handleCancelClick();

    }

    const handleCancelClick = () => {
        setUpdateId(0);
        setInputValue({
            id: 0,
            name: "",
            score: 0
        });
    }

    return (
        <div>
            <div>
                <input type="text" name='id' disabled={true} value={ inputValue.id } placeholder='ID'/>
                <input type="text" name='name' onChange={ handleInputChange } value={ inputValue.name } placeholder='이름' />
                <input type="text" name='score' onChange={ handleInputChange } value={ inputValue.score } placeholder='점수' />
                <button onClick={ handleAddClick }>추가</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th> 
                        <th>이름</th>
                        <th>점수</th>
                    </tr>
                </thead>
                <tbody>
                    { studentList.map(student => {
                        return <tr key={ student.id }>
                            <td>{ student.id }</td>
                            <td>{ student.name }</td>
                            <td>{ student.score }</td>
                            <td>
                                {
                                    updateId !== student.id
                                    ? <button onClick={() => {handleUpdateClick(student.id);}}>수정</button>
                                    : <button onClick={handleUpdateSubmitClick}>확인</button>
                                }
                            </td>
                            <td>
                                {
                                    updateId !== student.id
                                    ? <button onClick={() => {handleDeleteClick(student.id);}}>삭제</button>
                                    : <button onClick={handleCancelClick}>취소</button>
                                }
                            </td>
                        </tr>
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <th>총점</th>
                        <th colSpan={2}>{ scoreData.total }</th>
                    </tr>
                    <tr>
                        <th>평균</th>
                        <th colSpan={2}>{ scoreData.avg }</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default StudentArrayPage2;