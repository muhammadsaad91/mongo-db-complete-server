function post_create() {
    let student_name = document.getElementById('student_name').value;
    let father_name = document.getElementById('father_name').value;
    let age = document.getElementById('age').value;
    let roll_no = document.getElementById('roll_no').value;

    axios.post('https://muhammadsaad.herokuapp.com/user', {
        student_name: student_name,
        father_name: father_name,
        age: age,
        roll_no: roll_no
    }).then(function(response) {
        console.log(response);
        alert(response.data);

        document.getElementById('student_name').value = '';
        document.getElementById('father_name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('roll_no').value = '';

    }).catch(function(error) {
        console.log(error);
    })
}

function get_all() {
    axios.get('https://https://muhammadsaad.herokuapp.com/users')
        .then(function(response) {
            console.log(response);
            $html = '';
            response.data.forEach(function(data) {
                id = data._id;
                console.log(id);
                $html += '<tr id="' + id + '">';
                $html += '<td id="student_name_' + id + '">' + data.student_name + '</td>';
                $html += '<td id="father_name_' + id + '">' + data.father_name + '</td>';
                $html += '<td id="age_' + id + '">' + data.age + '</td>';
                $html += '<td id="roll_no_' + id + '">' + data.roll_no + '</td>';
                $html += '<td>';
                $html += '<button  class="btn btn-primary" onclick="get_record(this)" id=' + id + '>Edit</button >&nbsp;';
                $html += '<button  class="btn btn-danger" onclick="delete_student(this)" id=' + id + '>Delete</button >';
                $html += '</td>';
                $html += '</tr>';
            })

            document.getElementById('tblper').innerHTML = $html;
        })
        .catch(function(error) {
            console.log(error)
        })
        .then(function() {});
}

function get_record($obj) {
    console.log($obj);
    var id = $obj.getAttribute('id');
    console.log(id);
    let student_name = document.getElementById('student_name_' + id).innerHTML;
    let father_name = document.getElementById('father_name_' + id).innerHTML;
    let age = document.getElementById('age_' + id).innerHTML;
    let roll_no = document.getElementById('roll_no_' + id).innerHTML;

    $html = '';
    $html += '<tr id="' + id + '">';
    $html += '<td><input type="text" id="student_name_' + id + '" class="form-control" value="' + student_name + '"></td>';
    $html += '<td><input type="text" id="father_name_' + id + '" class="form-control" value="' + father_name + '"></td>';
    $html += '<td><input type="text" id="age_' + id + '" class="form-control" value="' + age + '"></td>';
    $html += '<td><input type="text" id="roll_no_' + id + '" class="form-control" value="' + roll_no + '"></td>';
    $html += '<td>';
    $html += '<button class="btn btn-success" onclick="update_student(this)" id=' + id + '>Update</button >';
    $html += '</td>';

    document.getElementById(id).innerHTML = $html;

}

function update_student($obj) {
    var id = $obj.getAttribute('id');
    let student_name = document.getElementById('student_name_' + id).value;
    let father_name = document.getElementById('father_name_' + id).value;
    let age = document.getElementById('age_' + id).value;
    let roll_no = document.getElementById('roll_no_' + id).value;

    axios.put('https://muhammadsaad.herokuapp.com/user/' + id, {
        student_name: student_name,
        father_name: father_name,
        age: age,
        roll_no: roll_no
    }).then(response => {
        console.log(response);
        alert("Employee Updated")
        get_all();
    }).catch(function(error) {
        console.log(error);
    })
}

function delete_student($obj) {
    console.log($obj);
    let id = $obj.getAttribute('id');
    axios.delete('https://muhammadsaad.herokuapp.com/user/' + id)
        .then(function(response) {
            console.log(response);
            alert("employee deleted");
            get_all();
        }).catch(function(error) {
            console.log(error);
        })
}
get_all();
