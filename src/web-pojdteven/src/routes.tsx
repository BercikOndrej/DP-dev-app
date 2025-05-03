import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/public/HomePage';
import ContactPage from './pages/public/ContactPage';
import ForestClubPage from './pages/public/ForestClubPage';
import AdaptationProgramPage from './pages/public/AdaptationProgramPage';
import Layout from './pages/Layout';
import ActionsPage from './pages/public/ActionsPage';
import PhotogalleryPage from './pages/public/PhotogalleryPage';
import SupportPage from './pages/public/SupportPage';
import MembersSectionPage from './pages/protected/MembersSectionPage';
import ErrorPage from './pages/ErrorPage';
import PrivateRoutes from './pages/protected/PrivateRoutes';
import PasswordResetPage from './pages/public/PasswordResetPage';
import AdminHomePage from './pages/admin/AdminHomePage';
import AdminUsersPage from './pages/admin/users/AdminUsersPage';
import UserDetailPage from './pages/admin/users/UserDetailPage';
import AdminActionPage from './pages/admin/actions/AdminActionPage';
import AdminContactInfoPage from './pages/admin/contactInfo/AdminContactInfoPage';
import AdminDayActivitiesPage from './pages/admin/dayActivities/AdminDayActivitiesPage';
import AdminGeneralInfoPage from './pages/admin/generalInfo/AdminGeneralInfoPage';
import GeneralInfoDetailPage from './pages/admin/generalInfo/GeneralInfoDetailPage';
import { PageType } from './enums';
import AdminChildrenPage from './pages/admin/children/AdminChildrenPage';
import ChildDetailPage from './pages/admin/children/ChildDetailPage';
import AdminTeachersPage from './pages/admin/teachers/AdminTeachersPage';
import AdminPhotogalleryPage from './pages/admin/photogallery/AdminPhotogalleryPage';
import AdminSponsorsPage from './pages/admin/sponsors/AdminSponsorsPage';
import TeacherDetailPage from './pages/admin/teachers/TeacherDetailPage';
import AdminChildrenAttendancePage from './pages/admin/attendance/AdminChildrenAttendancePage';
import ChildAttendanceDetailPage from './pages/admin/attendance/ChildAttendanceDetailPage';
import AdminTeachersAttendancePage from './pages/admin/attendance/AdminTeachersAttendancePage';
import TeacherAttendanceDetailPage from './pages/admin/attendance/TeacherAttendanceDetailPage';
import UsersChildrenManagement from './pages/admin/users/UsersChildrenManagement';
import TeacherAttendancePage from './pages/protected/TeacherAttendancePage';
import AdminRoutes from "@/pages/admin/AdminRoutes.tsx";
import {PrivacyPolicyPage} from '@/pages/public/PrivacyPolicyPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'lesni-detsky-klub', element: <ForestClubPage /> },
      { path: 'adaptacni-program', element: <AdaptationProgramPage /> },
      { path: 'akce', element: <ActionsPage /> },
      { path: 'fotogalerie', element: <PhotogalleryPage /> },
      { path: 'kontakt', element: <ContactPage /> },
      { path: 'podpora', element: <SupportPage /> },
      { path: 'resetHesla/:token', element: <PasswordResetPage /> },
      { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
    ],
  },

  // Private routes
  // Authenticated users
  {
    element: <PrivateRoutes />,
    children: [{ path: 'clenska-sekce', element: <MembersSectionPage /> }],
  },

  // Admin pages
  {
    path: 'admin/',
    element: <AdminRoutes />,
    children: [
      { index: true, element: <AdminHomePage /> },
      { path: 'users', element: <AdminUsersPage /> },
      { path: 'users/:id', element: <UserDetailPage /> },
      {
        path: 'users/:id/childrenManagement',
        element: <UsersChildrenManagement />,
      },
      { path: 'children', element: <AdminChildrenPage /> },
      { path: 'children/:id', element: <ChildDetailPage /> },
      { path: 'teachers', element: <AdminTeachersPage /> },
      { path: 'attendance/general', element: <TeacherAttendancePage /> },
      { path: 'attendance/children', element: <AdminChildrenAttendancePage /> },
      {
        path: 'attendance/children/:id',
        element: <ChildAttendanceDetailPage />,
      },
      { path: 'attendance/teachers', element: <AdminTeachersAttendancePage /> },
      {
        path: 'attendance/teachers/:id',
        element: <TeacherAttendanceDetailPage />,
      },

      { path: 'teachers/:id', element: <TeacherDetailPage /> },
      { path: 'photogallery', element: <AdminPhotogalleryPage /> },
      { path: 'sponsors', element: <AdminSponsorsPage /> },
      { path: 'actions', element: <AdminActionPage /> },
      { path: 'contactInfo', element: <AdminContactInfoPage /> },
      {
        path: 'generalInfo/forestClub',
        element: <AdminGeneralInfoPage page={PageType.FOREST_CLUB} />,
      },
      {
        path: 'generalInfo/adaptationProgram',
        element: <AdminGeneralInfoPage page={PageType.ADAPTATION_PROGRAM} />,
      },
      { path: 'generalInfo/:id', element: <GeneralInfoDetailPage /> },
      { path: 'dayActivities', element: <AdminDayActivitiesPage /> },
    ],
  },
]);

export default router;
