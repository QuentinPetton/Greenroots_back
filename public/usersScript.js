function displayEditUserModal(userId) {
  document.getElementById(`editUserModal-${userId}`).classList.remove('hidden');
}

function hideEditUserModal(userId) {
  document.getElementById(`editUserModal-${userId}`).classList.add('hidden');
}

async function editUser(event, userId) {
  event.preventDefault();

  const firstname = document.querySelector(
    `#editUserModal-${userId} input[name="firstname"]`,
  ).value;
  const lastname = document.querySelector(
    `#editUserModal-${userId} input[name="lastname"]`,
  ).value;
  const email = document.querySelector(
    `#editUserModal-${userId} input[name="email"]`,
  ).value;
  const phone_number = document.querySelector(
    `#editUserModal-${userId} input[name="phone_number"]`,
  ).value;
  const street_number = document.querySelector(
    `#editUserModal-${userId} input[name="street_number"]`,
  ).value;
  const street = document.querySelector(
    `#editUserModal-${userId} input[name="street"]`,
  ).value;
  const city = document.querySelector(
    `#editUserModal-${userId} input[name="city"]`,
  ).value;
  const postal_code = document.querySelector(
    `#editUserModal-${userId} input[name="postal_code"]`,
  ).value;
  const country = document.querySelector(
    `#editUserModal-${userId} input[name="country"]`,
  ).value;
  const entity_type = document.querySelector(
    `#editUserModal-${userId} input[name="entity_type"]`,
  ).value;
  const entity_name = document.querySelector(
    `#editUserModal-${userId} input[name="entity_name"]`,
  ).value;
  const entity_siret = document.querySelector(
    `#editUserModal-${userId} input[name="entity_siret"]`,
  ).value;
  const is_admin = document.querySelector(
    `#editUserModal-${userId} input[name="is_admin"]`,
  ).checked;
  const id_role = 1; // Remplacez par la valeur appropriée ou récupérez-la du formulaire

  try {
    const response = await fetch(`/admin/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstname,
        lastname,
        phone_number,
        street_number,
        street,
        city,
        postal_code,
        country,
        entity_type,
        entity_name,
        entity_siret,
        is_admin,
        id_role, // Ajout de id_role ici
      }),
    });

    if (response.ok) {
      console.log('Utilisateur mis à jour avec succès');
      window.location.reload();
    } else {
      const errorMessage = await response.json();
      console.error(
        "Erreur lors de la mise à jour de l'utilisateur",
        errorMessage,
      );
    }
  } catch (error) {
    console.error(
      "Erreur réseau lors de la mise à jour de l'utilisateur",
      error,
    );
  }
}
