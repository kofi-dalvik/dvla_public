import AppLoader from '../components/partials/Loader';

const Dashboard = () => ({
    loading: AppLoader,
    component: import('../views/dashboard/Index'),
});

const Login = () => ({
    loading: AppLoader,
    component: import('../views/login/Index'),
});

const Users = () => ({
    loading: AppLoader,
    component: import('../views/users/Index')
});

/**
 * Vehicle related route components
 */

const AllVehicles = () => ({
    loading: AppLoader,
    component: import('../views/vehicles/Index.vue')
});

const RegisterVehicle = () => ({
    loading: AppLoader,
    component: import('../views/vehicles/Register.vue')
});

const ChangeOwner = () => ({
    loading: AppLoader,
    component: import('../views/vehicles/ChangeOwner.vue')
});

const VehicleIncidence = () => ({
    loading: AppLoader,
    component: import('../views/vehicles/Incidence.vue')
});

const VehicleProfile = () => ({
    loading: AppLoader,
    component: import('../views/vehicles/Profile.vue')
});


/**
 * Admin related route components
 */
const Institutions = () => ({
    loading: AppLoader,
    component: import('../views/admin/institutions/Institutions.vue')
});

const Makes = () => ({
    loading: AppLoader,
    component: import('../views/admin/makes/makes.vue')
});

const Models = () => ({
    loading: AppLoader,
    component: import('../views/admin/models/models.vue')
});

/**
 * Vehicle Owners related route components
 */
const OwnersListing = () => ({
    loading: AppLoader,
    component: import('../views/owners/Index.vue')
});

const OwnersProfile = () => ({
    loading: AppLoader,
    component: import('../views/owners/Profile.vue')
});

/**
 * Insurance types
 */
const InsuranceTypes = () => ({
    loading: AppLoader,
    component: import('../views/insurance/Types.vue')
});

const InsuranceListing = () => ({
    loading: AppLoader,
    component: import('../views/insurance/Index.vue')
});

const CreateInsurance = () => ({
    loading: AppLoader,
    component: import('../views/insurance/CreateInsurance.vue')
})

const PublicDirectory = () => ({
    loading: AppLoader,
    component: import('../views/public-directory/Index.vue')
});

const CreateWorthies = () => ({
    loading: AppLoader,
    component: import('../views/road-worthies/CreateWorthies.vue')
});

const WorthiesListing = () => ({
    loading: AppLoader,
    component: import('../views/road-worthies/Index.vue')
});

export default [
    {
        path: '/',
        name: 'home',
        component: PublicDirectory
    },

    {
        path: '*',
        redirect: '/'
    }
];
