$(document).ready(function() {
    function loadCars() {
        $.ajax({
            url: '/car/api',
            type: 'GET',
            success: function(cars) {
                let carList = $('#car-list');
                carList.empty();
                cars.forEach(car => {
                    carList.append(`
                        <tr>
                            <td>${car.id}</td>
                            <td>${car.make}</td>
                            <td>${car.model}</td>
                            <td>${new Date(car.releaseDate).toLocaleDateString()}</td>
                            <td>${car.price}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-car" data-id="${car.id}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-car" data-id="${car.id}">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            }
        });
    }

    function resetCarForm() {
        $('#car-id').val('');
        $('#car-make').val('');
        $('#car-model').val('');
        $('#car-releaseDate').val('');
        $('#car-price').val('');
    }

    loadCars();

    $('#add-car').on('click', function() {
        resetCarForm();
        $('#carModalLabel').text('Add Car');
        $('#carModal').modal('show');
    });

    $('#car-form').on('submit', function(event) {
        event.preventDefault();
        const carId = $('#car-id').val();
        const carData = {
            make: $('#car-make').val(),
            model: $('#car-model').val(),
            releaseDate: $('#car-releaseDate').val(),
            price: $('#car-price').val()
        };

        if (carId) {
            // Update car
            $.ajax({
                url: `/car/api/${carId}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(carData),
                success: function() {
                    $('#carModal').modal('hide');
                    loadCars();
                },
                error: function() {
                    alert('Failed to update car.');
                }
            });
        } else {
            // Create new car
            $.ajax({
                url: '/car/api',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(carData),
                success: function() {
                    $('#carModal').modal('hide');
                    loadCars();
                },
                error: function() {
                    alert('Failed to create car.');
                }
            });
        }
    });

    $(document).on('click', '.delete-car', function() {
        const carId = $(this).data('id');

        $.ajax({
            url: `/car/api/${carId}`,
            type: 'DELETE',
            success: function() {
                loadCars();
            },
            error: function() {
                alert('Failed to delete car.');
            }
        });
    });

    $(document).on('click', '.edit-car', function() {
        const carId = $(this).data('id');

        $.ajax({
            url: `/car/api/${carId}`,
            type: 'GET',
            success: function(car) {
                $('#car-id').val(car.id);
                $('#car-make').val(car.make);
                $('#car-model').val(car.model);
                $('#car-releaseDate').val(new Date(car.releaseDate).toISOString().split('T')[0]);
                $('#car-price').val(car.price);
                $('#carModalLabel').text('Edit Car');
                $('#carModal').modal('show');
            },
            error: function() {
                alert('Failed to load car details.');
            }
        });
    });
});