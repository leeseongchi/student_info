import { useEffect, useRef, useState } from 'react';
import './App.css';
import StudentInfo from './components/StudentInfo';
import InfoInput from './components/InfoInput';
import InfoButtons from './components/InfoButtons';

function App() {
  const studentObj = {
    name: "",
    age: "",
    address: ""
  };
  
  const [ student, setStudent ] = useState(studentObj);
  const [ inputValues, setInputValues ] = useState(studentObj);
  // const [ refresh, setRefresh ] = useState(false);
  
  const inputRef = {
    name: useRef(),
    age: useRef(),
    address: useRef()
  }
  // const nameInputRef = useRef();
  // const ageInputRef = useRef();
  // const addressInputRef = useRef();

  useEffect(() => {
    console.log(inputRef.name.current);
  }, []);

  useEffect(() => {
    // if(refresh) {
      setInputValues(studentObj);
    // }
    // setRefresh(true);
  }, [student]);
  
  /**
    * js객체 특징
    * 1. 키값은 문자열이어도 된다.
    * 2. 변수의 문자열 값을 키값으로 쓰고 싶을 때 []대괄호로 묶어서 참조할 수 있다.
    * 3. 변수명만 입력하면 객체의 속성과 value로 한번에 정의할 수 있다.
  */

  let email = "email";
  let phone = "01099881916";

  let user = {
    username: "test",
    "password": "1234",
    [email]: "test",
    phone
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // if(name === "name") {
    //   setName(value);
    // }else if(name === "age") {
    //   setAge(value);
    // }else {
    //   setAddress(value);
    // }

    // switch(name) {
    //   case "name":
    //     inputValues.name = value;
    //     break;
    //   case "age":
    //     inputValues.age = value;
    //     break;
    //   case "address":
    //     inputValues.address = value;
    //     break;
    //   default:
    //     console.log(); 
    //   }

    setInputValues({
      ...inputValues,
      [name]: value
    });

  }
  const handleOnOk = () => {
      setStudent(inputValues);
  }

  const handleOnClean = () => {
    setStudent(studentObj);
  }

  return (
    <>
      <StudentInfo title="이름" text={ student.name }/>
      <StudentInfo title="나이" text={ student.age }/>
      <StudentInfo title="주소" text={ student.address }/>
      {/* <h1>이름: { student.name }</h1>
      <h1>나이: { student.age }</h1>
      <h1>주소: { student.address }</h1> */}

      <InfoInput
        name={ "name" }
        onChange={ handleInputChange }
        value={ inputValues.name }
        placeholder='이름'
        inputRef={ inputRef.name }
      />

      <InfoInput
        name={ "age" }
        onChange={ handleInputChange }
        value={ inputValues.age }
        placeholder='나이'
        inputRef={ inputRef.age }
      />

      <InfoInput
        name={ "address" }
        onChange={ handleInputChange }
        value={ inputValues.address }
        placeholder='주소'
        inputRef={ inputRef.address }
      />

      {/* <input type="text" 
        name='name' 
        onChange={ handleInputChange } 
        value={ inputValues.name } 
        placeholder='이름'/>

      <input type="text" 
        name='age' 
        onChange={ handleInputChange } 
        value={ inputValues.age } 
        placeholder='나이'/>

      <input type="text" 
        name='address' 
        onChange={ handleInputChange } 
        value={ inputValues.address } 
        placeholder='주소'/> */}

      {/* 자식요소를 태그 사이에 넣을 때는 매개변수에 children을 사용한다. */}
      <InfoButtons>
        <button onClick={ handleOnOk }>확인</button>
        <button onClick={ handleOnClean }>비우기</button>
      </InfoButtons>
    </>
  );
}

export default App;
