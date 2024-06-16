$(document).ready(function() {
    function loadSales() {
        $.ajax({
            url: '/sales/api',
            type: 'GET',
            success: function(sales) {
                let salesList = $('#sales-list');
                salesList.empty();
                sales.forEach(sale => {
                    salesList.append(`
                        <tr>
                            <td>${sale.id}</td>
                            <td>${sale.car.make} ${sale.car.model}</td>
                            <td>${sale.customer}</td>
                            <td>${new Date(sale.date).toLocaleDateString()}</td>
                            <td>${sale.price}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-sale" data-id="${sale.id}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-sale" data-id="${sale.id}">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            }
        });
    }

    function loadCarOptions() {
        $.ajax({
            url: '/car/api',
            type: 'GET',
            success: function(cars) {
                let carSelect = $('#sale-car');
                carSelect.empty();
                cars.forEach(car => {
                    carSelect.append(`<option value="${car.id}">${car.make} ${car.model}</option>`);
                });
            }
        });
    }

    function resetSaleForm() {
        $('#sale-id').val('');
        $('#sale-car').val('');
        $('#sale-customer').val('');
        $('#sale-date').val('');
        $('#sale-price').val('');
    }

    loadSales();
    loadCarOptions();

    $('#add-sale').on('click', function() {
        resetSaleForm();
        $('#saleModalLabel').text('Add Sale');
        $('#saleModal').modal('show');
    });

    $('#sale-form').on('submit', function(event) {
        event.preventDefault();
        const saleId = $('#sale-id').val();
        const saleData = {
            car: { id: $('#sale-car').val() },
            customer: $('#sale-customer').val(),
            date: $('#sale-date').val(),
            price: $('#sale-price').val()
        };

        if (saleId) {
            // Update sale
            $.ajax({
                url: `/sales/api/${saleId}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(saleData),
                success: function() {
                    $('#saleModal').modal('hide');
                    loadSales();
                },
                error: function() {
                    alert('Failed to update sale.');
                }
            });
        } else {
            // Create new sale
            $.ajax({
                url: '/sales/api',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(saleData),
                success: function() {
                    $('#saleModal').modal('hide');
                    loadSales();
                },
                error: function() {
                    alert('Failed to create sale.');
                }
            });
        }
    });

    $(document).on('click', '.delete-sale', function() {
        const saleId = $(this).data('id');

        $.ajax({
            url: `/sales/api/${saleId}`,
            type: 'DELETE',
            success: function() {
                loadSales();
            },
            error: function() {
                alert('Failed to delete sale.');
            }
        });
    });

    $(document).on('click', '.edit-sale', function() {
        const saleId = $(this).data('id');

        $.ajax({
            url: `/sales/api/${saleId}`,
            type: 'GET',
            success: function(sale) {
                $('#sale-id').val(sale.id);
                $('#sale-car').val(sale.car.id);
                $('#sale-customer').val(sale.customer);
                $('#sale-date').val(new Date(sale.date).toISOString().split('T')[0]);
                $('#sale-price').val(sale.price);
                $('#saleModalLabel').text('Edit Sale');
                $('#saleModal').modal('show');
            },
            error: function() {
                alert('Failed to load sale details.');
            }
        });
    });
});