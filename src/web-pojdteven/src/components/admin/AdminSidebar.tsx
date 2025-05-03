import { ADMIN_PAGE_MENU_ITEMS } from '@/utils/constants';
import { Book, Undo2 } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { ModeToggle } from '../ui/mode-toggle';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

const renderAttendanceGroup = () => {
  return (
    <Collapsible key={'Docházka'} defaultOpen className='group/collapsible'>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <Book />
            Docházka
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <NavLink end={false} to={'/admin/attendance/general'}>
                <SidebarMenuButton
                  isActive={location.pathname === 'admin/attendance/general'}
                >
                  Přehled
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <NavLink end={false} to={'/admin/attendance/children'}>
                <SidebarMenuButton
                  isActive={location.pathname === 'admin/attendance/children'}
                >
                  Děti
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <NavLink end={false} to={'/admin/attendance/teachers'}>
                <SidebarMenuButton
                  isActive={location.pathname === 'admin/attendance/teachers'}
                >
                  Průvodci
                </SidebarMenuButton>
              </NavLink>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const AdminSidebar = () => {
  const location = useLocation();
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='group-data-[collapsible=icon]:hidden'>
        Lesní dětský klub
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {ADMIN_PAGE_MENU_ITEMS.map((item) => {
            return item.title === 'Docházka' ? (
              renderAttendanceGroup()
            ) : (
              <SidebarMenuItem key={`${item.title}${item.link}`}>
                <NavLink end={false} to={item.link}>
                  <SidebarMenuButton isActive={location.pathname === item.link}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </NavLink>
              </SidebarMenuItem>
            );
          })}

          <Collapsible defaultOpen className='group/collapsible'>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <Book />
                  Obecné info
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <NavLink end={false} to={'/admin/generalInfo/forestClub'}>
                      <SidebarMenuButton
                        isActive={
                          location.pathname === 'admin/generalInfo/forestClub'
                        }
                      >
                        Lesní dětský klub
                      </SidebarMenuButton>
                    </NavLink>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <NavLink
                      end={false}
                      to={'/admin/generalInfo/adaptationProgram'}
                    >
                      <SidebarMenuButton
                        isActive={
                          location.pathname ===
                          'admin/generalInfo/adaptationProgram'
                        }
                      >
                        Adaptační program
                      </SidebarMenuButton>
                    </NavLink>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          <SidebarMenuItem>
            <NavLink end={false} to='/'>
              <SidebarMenuButton>
                <Undo2 />
                Zpět na hlavní stránky
              </SidebarMenuButton>
            </NavLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className='ml-auto'>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
