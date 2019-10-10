import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { FileUploadModule} from 'ng2-file-upload'
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppRoutingModule } from './route/app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './comp/add-user/add-user.component';
import { UserComponent } from './comp/user/user.component';
import { UserDetailsComponent } from './comp/user-details/user-details.component';
import { RegisterComponent } from './comp/register/register.component';
import { HomeComponent } from './comp/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { EditComponent } from './comp/edit/edit.component';
import { LoginComponent } from './comp/login/login.component';
import { ProfileComponent } from './comp/profile/profile.component';
import { ChatComponent } from './comp/chat/chat.component';
import { AddClassComponent } from './comp/add-class/add-class.component';
import { EnrollComponent } from './comp/enroll/enroll.component';
import { AddSubjectComponent } from './comp/add-subject/add-subject.component';
import { ClassDataComponent } from './comp/profile/class-data/class-data.component';
import { ShowClassEnrolledComponent } from './comp/profile/show-class-enrolled/show-class-enrolled.component';

import { AuthGuardService } from './services/auth-guard.service'
import { AuthService} from './services/auth.service';
import { AdmincenterComponent } from './comp/admin/admincenter/admincenter.component'
import { RoleGuardService } from './services/role-guard.service';
import { ClassComponent } from './comp/class/class.component';
import { MainComponent } from './class/main/main.component';
import { UploadCoverComponent } from './comp/upload-cover/upload-cover.component';
import { UseradComponent } from './comp/userad/userad.component';
import { UseradDetailsComponent } from './comp/userad-details/userad-details.component';
import { AddquestionComponent } from './class/addquestion/addquestion.component';
import { MessageListComponent } from './chat/message-list/message-list.component';
import { MessageItemComponent } from './chat/message-item/message-item.component';
import { MessageFormComponent } from './chat/message-form/message-form.component';
import { UiComponent } from './chat/ui/ui.component';
import { DialogflowService } from './services/dialogflow.service';
import { BotService } from './services/bot.service';
import { SubContentComponent } from './class/sub-content/sub-content.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UserComponent,
    UserDetailsComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    EditComponent,
    LoginComponent,
    ProfileComponent,
    ChatComponent,
    AddClassComponent,
    EnrollComponent,
    AddSubjectComponent,
    ClassDataComponent,
    ShowClassEnrolledComponent,
    AdmincenterComponent,
    ClassComponent,
    MainComponent,
    UploadCoverComponent,
    UseradComponent,
    UseradDetailsComponent,
    AddquestionComponent,
    MessageListComponent,
    MessageItemComponent,
    MessageFormComponent,
    UiComponent,
    SubContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    PdfViewerModule,
  ],
  providers: [AuthService, AuthGuardService , RoleGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
