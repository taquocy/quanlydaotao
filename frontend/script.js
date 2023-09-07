const host = 'http://127.0.0.1:4000';


// Sử dụng sự kiện DOMContentLoaded để gọi hàm fetchAndDisplayHocPhan
document.addEventListener('DOMContentLoaded', function () {

    initEvent()
    initEventForFormAddModule()
    initEventForFormSection()
    fetchAndDisplayCtdt();
    // Load hoc phan ko thuoc module nao
    fetchAndDisplayUnselectedHocPhan()
    fetchAndDisplayUnselectedModules()

});

function initEvent() {
    // Lấy các phần tử DOM
    const btnCreateHocPhan = document.getElementById('btnCreateHocPhan');
    const hocPhanForm = document.getElementById('hocPhanForm');
    // Lấy nút "Hủy"
    const btnCancel = document.getElementById('btnCancel');
    // Lấy nút "Lưu"
    const btnSave = document.getElementById('btnSave');

    // Sự kiện click trên nút "Tạo mới học phần"
    btnCreateHocPhan.addEventListener('click', () => {
        hocPhanForm.classList.remove('hidden');
    });

    // Sự kiện click trên nút "Hủy"
    btnCancel.addEventListener('click', () => {
        // Ẩn form khi nút "Hủy" được nhấn
        hocPhanForm.classList.add('hidden');
    });


    // Sự kiện click trên nút "Lưu"
    btnSave.addEventListener('click', () => {
        // Lấy giá trị từ các trường dữ liệu
        const maHocPhanInput = document.getElementById('maHocPhan');
        const tenHocPhanInput = document.getElementById('tenHocPhan');
        const soTinChiInput = document.getElementById('soTinChi');
        const maHocPhan = maHocPhanInput.value;
        const tenHocPhan = tenHocPhanInput.value;
        const soTinChi = soTinChiInput.value;

        // Gửi dữ liệu lên server thông qua API (sử dụng fetch hoặc Axios)
        // Đảm bảo thay đổi URL API và tùy chỉnh phương thức, tiêu đề và dữ liệu gửi theo cách phù hợp
        fetch(`${host}/api/createHocPhan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ maHocPhan, tenHocPhan, soTinChi }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Xử lý kết quả từ server (có thể là hiển thị thông báo thành công hoặc làm gì đó khác)
                console.log(data);
                // Ẩn form sau khi gửi dữ liệu
                hocPhanForm.classList.add('hidden');
                // reload lại
                fetchAndDisplayUnselectedHocPhan();
            })
            .catch((error) => {
                console.error('Lỗi khi tạo mới học phần:', error);
            });
    });



}

function initEventForFormAddModule() {
    // Lấy các phần tử DOM
    const addModuleButton = document.getElementById('addModuleButton');
    const moduleForm = document.getElementById('moduleForm');
    const cancelButton = document.getElementById('cancelButton');

    // Sự kiện click vào nút "Thêm Module"
    addModuleButton.addEventListener('click', () => {
        moduleForm.style.display = 'block'; // Hiển thị form
    });

    // Sự kiện click vào nút "Hủy"
    cancelButton.addEventListener('click', () => {
        moduleForm.style.display = 'none'; // Ẩn form
    });
    // Lấy form và các trường dữ liệu
    const createModuleForm = document.getElementById('createModuleForm');
    const tenModuleInput = document.getElementById('tenModule');

    // Lấy nút Lưu
    const saveButton = document.getElementById('saveButton');

    // Sự kiện click nút Lưu
    saveButton.addEventListener('click', () => {
        // Lấy giá trị từ các trường dữ liệu
        const tenModule = tenModuleInput.value;

        // Gửi dữ liệu lên server thông qua API (sử dụng fetch hoặc Axios)
        // Đảm bảo thay đổi URL API và tùy chỉnh phương thức, tiêu đề và dữ liệu gửi theo cách phù hợp
        fetch(`${host}/api/createModule`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tenModule }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Xử lý kết quả từ server (có thể là hiển thị thông báo thành công hoặc làm gì đó khác)
                console.log(data);

                // Đóng form sau khi gửi dữ liệu thành công
                createModuleForm.classList.add('hidden');

                // Sau khi tạo mới module, bạn có thể thực hiện các hành động cần thiết, ví dụ: cập nhật danh sách module.
                fetchAndDisplayUnselectedModules()
            })
            .catch((error) => {
                console.error('Lỗi khi tạo mới module:', error);
            });
    });

}

function initEventForFormSection() {
    // Lấy các phần tử HTML
    debugger
    const addSectionButton = document.getElementById('addSectionButton');
    const createSectionForm = document.getElementById('createSectionForm');
    const sectionForm = document.getElementById('sectionForm');
    const cancelButton = document.getElementById('cancelButtonSection');

    // Sự kiện khi nút "Thêm mới Section" được bấm
    addSectionButton.addEventListener('click', () => {
        debugger
        sectionForm.style.display = 'block'; // Hiển thị form
        
    });

    // Sự kiện khi nút "Hủy" được bấm
    cancelButton.addEventListener('click', () => {
        sectionForm.style.display = 'none'; // Hiển thị form
    });

    // Sự kiện khi form "Tạo mới Section" được gửi đi (tùy theo logic của bạn)
    sectionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Xử lý dữ liệu và gửi đi thông qua API (sử dụng fetch hoặc Axios)
        // Đảm bảo cập nhật URL API và tùy chỉnh phương thức, tiêu đề và dữ liệu gửi đi theo cách phù hợp

        // Sau khi xử lý xong, có thể đóng form bằng cách:
        sectionForm.style.display = 'none'; // Hiển thị form
    });

}

function getDataOfCTDT() {
    // Lấy tham chiếu đến combobox
    const ctdtSelect = document.getElementById('ctdtSelect');
    fetchAndDisplayPhanDaoTao(ctdtSelect.value);
    // Thêm sự kiện "change" vào combobox
    ctdtSelect.addEventListener('change', function () {
        // Lấy giá trị năm từ mục đã chọn
        const selectedCTDT = ctdtSelect.value;
        fetchAndDisplayPhanDaoTao(selectedCTDT);
    });
}

// Function để gọi API và hiển thị dữ liệu trong combobox
function fetchAndDisplayCtdt() {
    fetch('http://localhost:4000/api/ctdt') // Điều chỉnh URL API của bạn
        .then(response => response.json())
        .then(data => {
            const ctdtSelect = document.getElementById('ctdtSelect'); // Lấy combobox (select)

            // Xóa tất cả các mục hiện tại trong combobox
            ctdtSelect.innerHTML = '';

            // Lặp qua danh sách chương trình đào tạo và thêm chúng vào combobox
            data.forEach(ctdt => {
                const option = document.createElement('option');
                option.value = ctdt.ID
                option.textContent = `${ctdt.TenChuongTrinh} - ${ctdt.NamHoc}`; // Hiển thị chương trình đào tạo - năm  
                ctdtSelect.appendChild(option);
            });
            getDataOfCTDT()
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu chương trình đào tạo:', error);
        });
}

// Function để gọi API và hiển thị chương trình đào tạo
function fetchAndDisplayPhanDaoTao(idCTDT) {
    fetch(`${host}/api/phanDaoTao/${idCTDT}`) // Điều chỉnh URL API của bạn
        .then(response => response.json())
        .then(data => {
            const ctdtContainer = document.getElementById('ctdt'); // Lấy phần tử chứa chương trình đào tạo

            // Xóa nội dung hiện tại của cột Chương trình đào tạo (nếu có)
            // ctdtContainer.innerHTML = '';

            // Lặp qua danh sách phần đào tạo và hiển thị chúng
            data.forEach(phanDaoTao => {
                const phanDaoTaoItem = document.createElement('div');
                phanDaoTaoItem.id = `section-${phanDaoTao.ID}`;
                phanDaoTaoItem.classList.add('ctdt-item');
                phanDaoTaoItem.textContent = `${phanDaoTao.TenPhan}`;
                ctdtContainer.appendChild(phanDaoTaoItem);

                fetchAndDisplayModules(phanDaoTao.ID)
            });
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu phân đào tạo:', error);
        });

}



function fetchAndDisplayHocPhan(moduleID) {
    fetch(`${host}/api/hocphan/${moduleID}`)
        .then(response => response.json())
        .then(data => {
            const moduleContainer = document.getElementById(`module-${moduleID}`);

            data.forEach(hocPhan => {
                const hocPhanItem = document.createElement('div');
                hocPhanItem.classList.add('hoc-phan-item');
                hocPhanItem.draggable = true;
                hocPhanItem.ondragstart = drag;
                hocPhanItem.id = `hoc-phan-${hocPhan.ID}`;
                hocPhanItem.textContent = `${hocPhan.MaHocPhan} | ${hocPhan.TenHocPhan} | ${hocPhan.SoTinChi}`;

                moduleContainer.appendChild(hocPhanItem);
            });
        })
        .catch(error => {
            console.error('Lỗi khi lấy danh sách học phần:', error);
        });

}

function fetchAndDisplayUnselectedHocPhan() {
    fetch(`${host}/api/hocphan`)
        .then(response => response.json())
        .then(data => {
            const listHocPhan = document.getElementById(`hoc-phan`);

            data.forEach(hocPhan => {
                const hocPhanItem = document.createElement('div');
                hocPhanItem.classList.add('hoc-phan-item');
                hocPhanItem.draggable = true;
                hocPhanItem.ondragstart = drag;
                hocPhanItem.id = `hoc-phan-${hocPhan.ID}`;
                hocPhanItem.textContent = `${hocPhan.MaHocPhan} | ${hocPhan.TenHocPhan} | ${hocPhan.SoTinChi}`;

                listHocPhan.appendChild(hocPhanItem);
            });
        })
        .catch(error => {
            console.error('Lỗi khi lấy danh sách học phần:', error);
        });

}


function fetchAndDisplayUnselectedModules() {
    // Gọi API lấy danh sách module
    fetch(`${host}/api/modules`) // Điều chỉnh URL API của bạn
        .then(response => response.json())
        .then(data => {
            // const moduleContainer = document.getElementById('module'); // Lấy phần tử chứa danh sách module
            const listModule = document.getElementById(`module`); // Lấy phần tử chứa danh sách module

            // Lặp qua danh sách module và hiển thị chúng
            data.forEach(module => {
                const moduleItem = document.createElement('div');
                // Tạo id động cho mỗi phần tử module
                moduleItem.id = `module-${module.ID}`;
                moduleItem.classList.add('module-item');
                moduleItem.draggable = true; // Cho phép kéo và thả
                moduleItem.ondragstart = drag;
                moduleItem.textContent = `${module.TenModule}`;
                listModule.appendChild(moduleItem);
                fetchAndDisplayHocPhan(module.ID)
            });
        })
        .catch(error => {
            console.error('Lỗi khi lấy danh sách module:', error);
        });
}

// Function để gọi API và hiển thị danh sách module
function fetchAndDisplayModules(idPhanDaotao) {
    // Gọi API lấy danh sách module
    fetch(`${host}/api/modules/${idPhanDaotao}`) // Điều chỉnh URL API của bạn
        .then(response => response.json())
        .then(data => {
            // const moduleContainer = document.getElementById('module'); // Lấy phần tử chứa danh sách module
            const sectionContainer = document.getElementById(`section-${idPhanDaotao}`); // Lấy phần tử chứa danh sách module

            // Lặp qua danh sách module và hiển thị chúng
            data.forEach(module => {
                const moduleItem = document.createElement('div');
                // Tạo id động cho mỗi phần tử module
                moduleItem.id = `module-${module.ID}`;
                moduleItem.classList.add('module-item');
                moduleItem.draggable = true; // Cho phép kéo và thả
                moduleItem.ondragstart = drag;
                moduleItem.textContent = `${module.TenModule}`;
                sectionContainer.appendChild(moduleItem);
                fetchAndDisplayHocPhan(module.ID)
            });
        })
        .catch(error => {
            console.error('Lỗi khi lấy danh sách module:', error);
        });
}

// Function để xử lý sự kiện kéo
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}


// Function để xử lý sự kiện thả
function allowDrop(event) {
    event.preventDefault();
}

// Function để xử lý sự kiện thả
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const element = document.getElementById(data);
    const target = event.target;

    // Kiểm tra xem mục tiêu (target) có phải là một Node hợp lệ không
    if (target.id === "ctdt" || target.parentElement.id === "ctdt") {
        // Kéo và thả từ cột Module sang cột CTDT
        if (data.includes('module')) {
            let idModule = data.substring("module-".length);
            let idModuleValue = parseInt(idModule);
            if (target.id.includes('section-')) {
                let sectionID = target.id.substring("section-".length)
                let sectionIDValue = parseInt(sectionID);
                updateModuleVaoSection(idModuleValue, sectionIDValue, () => {
                    target.appendChild(element);
                })
            }

        }
    } else if (target.id === "module" || target.parentElement.id === "module" || target.id.includes("module-")) {
        // Kéo và thả từ cột CTDT sang cột Module
        // Lấy id hoc phan va id 
        let idModule = target.id.substring("module-".length)
        let idModuleValue = parseInt(idModule);
        if (data.includes('hoc-phan')) {
            let idHP = data.substring("hoc-phan-".length);
            let valueIDHP = parseInt(idHP);
            updateHocPhanVaoModule(valueIDHP, idModuleValue, () => {
                target.appendChild(element);
            })
        }
        if (data.includes('module')) {
            let idModule = data.substring("module-".length);
            let idModuleValue = parseInt(idModule);
            updateModuleVaoSection(idModuleValue, -1, () => {
                target.appendChild(element);
            })
        }


        // Kéo và thả từ cột Hoc phan
    } else if (target.id === 'hoc-phan') {
        if (data.includes('hoc-phan')) {
            let idHP = data.substring("hoc-phan-".length);
            let valueIDHP = parseInt(idHP);
            updateHocPhanVaoModule(valueIDHP, -1, () => {
                target.appendChild(element);
            })
        }

    }
}


function updateHocPhanVaoModule(hocPhanID, moduleID, callback) {
    // Dữ liệu cần gửi lên server
    const data = {
        moduleID: moduleID,  // Thay đổi giá trị ID Module tùy theo trường hợp của bạn
    };

    // URL API endpoint
    const apiUrl = `${host}/api/updateHocPhan/${hocPhanID}`; // Thay đổi URL API endpoint tùy theo địa chỉ máy chủ của bạn

    // Tùy chỉnh cấu hình yêu cầu
    const requestOptions = {
        method: 'PUT', // Sử dụng phương thức PUT để cập nhật thông tin Học phần
        headers: {
            'Content-Type': 'application/json', // Loại dữ liệu gửi đi
        },
        body: JSON.stringify(data), // Chuyển đổi dữ liệu thành JSON và gửi lên server
    };

    // Gọi API
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Lỗi khi gọi API');
            }
            return response.json();
        })
        .then(result => {
            console.log(result.message); // In ra thông báo từ server
            // Thực hiện các xử lý khác (nếu cần)
            callback()
        })
        .catch(error => {
            console.error('Lỗi khi gọi API:', error);
        });
}

function updateModuleVaoSection(idModule, idSection, callback) {
    // Dữ liệu cần gửi lên server
    const data = {
        idSection: idSection,  // Thay đổi giá trị ID Module tùy theo trường hợp của bạn
    };

    // URL API endpoint
    const apiUrl = `${host}/api/updateModule/${idModule}`; // Thay đổi URL API endpoint tùy theo địa chỉ máy chủ của bạn

    // Tùy chỉnh cấu hình yêu cầu
    const requestOptions = {
        method: 'PUT', // Sử dụng phương thức PUT để cập nhật thông tin Học phần
        headers: {
            'Content-Type': 'application/json', // Loại dữ liệu gửi đi
        },
        body: JSON.stringify(data), // Chuyển đổi dữ liệu thành JSON và gửi lên server
    };

    // Gọi API
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Lỗi khi gọi API');
            }
            return response.json();
        })
        .then(result => {
            console.log(result.message); // In ra thông báo từ server
            // Thực hiện các xử lý khác (nếu cần)
            callback()
        })
        .catch(error => {
            console.error('Lỗi khi gọi API:', error);
        });
}