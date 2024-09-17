import React, { useEffect, useRef, useState } from "react";

function EmployeeDataForm() {
  let countrySelectedRef = useRef();
  let genderSelectedRef = useRef();
  let departmentSelectedRef = useRef();
  let limitSelectedRef = useRef();

  useEffect(() => {
    getListFromDB();
  }, []);

  let [list, setList] = useState({});

  let getListFromDB = async () => {
  
      let requestOptions = { method: "GET" };
      let jsonData = await fetch("http://localhost:1234/lists", requestOptions);
      let jsoData = await jsonData.json();
    
        setList(jsoData);
    
   
      console.log(jsoData);
      
  

  };

  let [employee, setEmployee] = useState([]);
  let getEmployeeDataFromDB = async () => {
  
      let requestOptions = { method: "GET" };
  let url;
      // Use query strings
      url = `http://localhost:1234/getEmployeeData`;
      url += `?gender=${genderSelectedRef.current.value}&department=${departmentSelectedRef.current.value}&country=${countrySelectedRef.current.value}`;
  
      // OR use URL parameters
       //url = `http://localhost:1234/getEmployeeData/${genderSelectedRef.current.value}/${departmentSelectedRef.current.value}/${countrySelectedRef.current.value}`;
  
      let jsonData = await fetch(url, requestOptions);
      let jsoData = await jsonData.json();
      setEmployee(jsoData);
console.log(jsoData);
  };

  return (
    <div>
      <form className="form">
        <div>
          <label className="label">Gender</label>
          <select ref={genderSelectedRef}>
            {list.genders
              ? list.genders.map((ele, i) => {
                  return <option key={i}>{ele}</option>;
                })
              : null}
          </select>
        </div>
        <div>
          <label className="label">Department</label>
          <select ref={departmentSelectedRef}>
            {list.departments
              ? list.departments.map((ele, i) => {
                  return <option key={i}>{ele}</option>;
                })
              : null}
          </select>
        </div>
        <div>
          <label className="label">Country</label>
          <select ref={countrySelectedRef}>
            {list.countries
              ? list.countries.map((ele, i) => {
                  return <option key={i}>{ele}</option>;
                })
              : null}
          </select>
        </div>
        <div>
          <label className="label">Limit</label>
          <select ref={limitSelectedRef}>
            <option>0-100</option>
            <option>100-200</option>
            <option>200-300</option>
            <option>300-400</option>
            <option>400-500</option>
            <option>500-600</option>
            <option>600-700</option>
            <option>700-800</option>
            <option>800-900</option>
            <option>900-1000</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => {
            getEmployeeDataFromDB();
          }}
        >
          Get Employees
        </button>
      </form>
      <table>
        <thead>
          <th>S.NO</th>
          <th>Id</th>
          <th>ProfilePic</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Department</th>
          <th>Country</th>
        </thead>
        <tbody>
          {employee.map((ele, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{ele.id}</td>
                <td>
                  <img src={ele.profilePic} alt="Description"></img>
                </td>
                <td>{ele.firstName}</td>
                <td>{ele.lastName}</td>
                <td>{ele.gender}</td>
                <td>{ele.email}</td>
                <td>
                  <p>{ele.department}</p>
                </td>
                <td>{ele.country}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default EmployeeDataForm;