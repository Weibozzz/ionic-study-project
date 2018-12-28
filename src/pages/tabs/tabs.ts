import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { DiscoveryPage } from '../discovery/discovery';
import { ChatPage } from '../chat/chat';
import { NotificationsPage } from '../notifications/notifications';
import { MorePage } from '../more/more';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabDiscovery = DiscoveryPage;
  tabChat = ChatPage;
  tabNotification = NotificationsPage;
  tabMore = MorePage;

  constructor() {

  }
}
