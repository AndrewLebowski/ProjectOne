import BasePage from '../PageObjects/BasePage';
import TopBar from '../PageObjects/TopBar';
import LoginPage from '../PageObjects/LoginPage';
import NewPostForm from '../PageObjects/NewPostForm';
import Post from '../PageObjects/Post';
import ProfilePage from '../PageObjects/ProfilePage';
import ConfirmWindow from '../PageObjects/ConfirmWindow';
import SuccessWindow from '../PageObjects/SuccessWindow';
import config from '../../config';
import uploadFile from '../helpers/uploadFile';
import clearInput from '../helpers/clearInput';

describe('Check post functionality', () => {
    beforeEach(() => {
        browser.setWindowSize(1920, 1080);
        BasePage.open();
        TopBar.profileMenu.click();
        expect(TopBar.loginListItem).toBeDisplayed();
        TopBar.loginListItem.click();
        LoginPage.emailInput.setValue(config.testEmail);
        LoginPage.passwordInput.setValue(config.testPasswordChanged);
        LoginPage.loginButton.click();
        expect(NewPostForm.pageTitle).toHaveText('Create your post');
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('should display elements on new post form', () => {
        expect(NewPostForm.titleInput).toBeDisplayed();
        expect(NewPostForm.textInput).toBeDisplayed();
        expect(NewPostForm.cameraButton).toBeDisplayed();
        expect(NewPostForm.cameraButton).toBeClickable();
        expect(NewPostForm.addPostButton).toBeDisplayed();
        expect(NewPostForm.addPostButton).toBeClickable();
        uploadFile(NewPostForm.hiddenImageInput, '../assets/images/art.jpg');
        expect(NewPostForm.imageName).toBeDisplayed();
        expect(NewPostForm.deleteImageButton).toBeDisplayed();
        expect(NewPostForm.addPostButton).toBeClickable();
    });
    it('shoud successfully add new post', () => {
        NewPostForm.titleInput.setValue('Post title');
        NewPostForm.textInput.setValue('Post text content');
        NewPostForm.addPostButton.click();
        expect(Post.postTitle).toHaveText('Post title');
        expect(Post.postText).toHaveText('Post text content');
        expect(Post.postDate).toBeDisplayed();
        NewPostForm.titleInput.setValue('Another post title');
        NewPostForm.textInput.setValue('Another post text content');
        uploadFile(NewPostForm.hiddenImageInput, '../assets/images/art.jpg');
        NewPostForm.addPostButton.click();
        expect(Post.postTitle).toHaveText('Another post title');
        expect(Post.postText).toHaveText('Another post text content');
        expect(Post.postImage).toBeDisplayed();
        expect(Post.postDate).toBeDisplayed();
    });
    it('should display error when adding post with invalid data', () => {
        NewPostForm.addPostButton.click();
        expect(NewPostForm.titleError).toHaveText('Title is required !');
        expect(NewPostForm.textError).toHaveText('Text is required !');
        NewPostForm.titleInput.setValue('Post title');
        NewPostForm.addPostButton.click();
        NewPostForm.titleError.waitForExist({ reverse: true });
        expect(NewPostForm.textError).toHaveText('Text is required !');
        clearInput(NewPostForm.titleInput);
        NewPostForm.textInput.setValue('Post text');
        NewPostForm.addPostButton.click();
        expect(NewPostForm.titleError).toHaveText('Title is required !');
        NewPostForm.textError.waitForExist({ reverse: true });
    });
    it('should successfully delete post', () => {
        TopBar.profileMenu.click();
        TopBar.profileListItem.click();
        expect(ProfilePage.pageTitle).toHaveText('Profile');
        ProfilePage.profileNewsfeedTab.click();
        expect(Post.postTitle).toBeDisplayed();
        expect(Post.postTitle).toHaveText('Another post title');
        expect(Post.deletePostButton).toBeDisplayed();
        Post.deletePostButton.click();
        expect(ConfirmWindow.content).toBeDisplayed();
        expect(ConfirmWindow.calcelButton).toBeDisplayed();
        ConfirmWindow.calcelButton.click();
        ConfirmWindow.content.waitForExist({ reverse: true });
        Post.deletePostButton.click();
        expect(ConfirmWindow.content).toBeDisplayed();
        expect(ConfirmWindow.confirmButton).toBeDisplayed();
        ConfirmWindow.confirmButton.click();
        expect(SuccessWindow.content).toBeDisplayed();
        expect(SuccessWindow.okButton).toBeDisplayed();
        SuccessWindow.okButton.click();
        ProfilePage.profileNewsfeedTab.click()
        expect(Post.postTitle).toBeDisplayed();
        expect(Post.postTitle).toHaveText('Post title');
        expect(Post.deletePostButton).toBeDisplayed();
        Post.deletePostButton.click();
        expect(ConfirmWindow.content).toBeDisplayed();
        expect(ConfirmWindow.confirmButton).toBeDisplayed();
        ConfirmWindow.confirmButton.click();
        expect(SuccessWindow.content).toBeDisplayed();
        expect(SuccessWindow.okButton).toBeDisplayed();
        SuccessWindow.okButton.click();
        ProfilePage.profileNewsfeedTab.click()
        Post.postTitle.waitForExist({ reverse: true });
    });
})