(function () {
  'use strict';

  // Profiles controller
  angular
      .module('core')
      .controller('ProfilesController', ProfilesController);

  ProfilesController.$inject = ['$http','$scope','ApiUrl', '$q', '$ionicPopup', '$state', 'Authentication','$timeout','ionicDatePicker'];

  function ProfilesController($http,$scope,ApiUrl, $q, $ionicPopup, $state, Authentication, $timeout, ionicDatePicker) {
    var vm = this;
    vm.apiUrl=ApiUrl.url;
    vm.authentication = Authentication;
    vm.getProfilesForCandidate=getProfilesForCandidate;
    vm.profiles = [];
    vm.skillsName = [];
    vm.skillList = skillList;
    vm.experienceList = ['0','<1','1','2','3','4','5','6','7','8','9','10','>10'];
    $scope.rating = {};
    $scope.rating.rate = 0;
    $scope.rating.max = 5;
    vm.saveskills = saveskills;
    vm.removeing = removeing;
    vm.editrecord = editrecord;
    vm.updateSkill = updateSkill;
    vm.index = '';
    vm.backprofile = backprofile;
    vm.profileclose = profileclose;
    vm.savePersonalProfile = savePersonalProfile;
    vm.savedetailProfile = savedetailProfile;
    vm.profiledetial = '';
    vm.profile = {};
    vm.myTags = [];
    vm.primaryProfile = false;


    function savedetailProfile(title,sal,loc){
      vm.profiledetial.name=title;
      vm.profiledetial.expecsal = sal;
      vm.profiledetial.currentlocation = loc;
      $state.go('profile.edit');
    }



    function savePersonalProfile(){

      if(!vm.profiledetial.name || !vm.profiledetial.expecsal || !vm.profiledetial.currentlocation){
        var Popup=$ionicPopup.show({
          title: 'Please fill professional details'
        });

        $timeout(function() {
          Popup.close();
        }, 2000);
        return;
      }
      else{
        vm.profile = {
          name: vm.profiledetial.name,
          expecsal: vm.profiledetial.expecsal,
          currentlocation: vm.profiledetial.currentlocation,
          myTags: vm.myTags,
          mySkills: vm.profileskills,
          myCertifications: vm.profilecertificate,
          myEducation: vm.profileEducation,
          myJobs: vm.profileEmployement,
          myProjects: [],
          primaryProfile: vm.primaryProfile
        }
        var url = ApiUrl.url + '/api/profiles';
        $http.post(url, vm.profile).then(function (res) {

          //console.log('reference');
          vm.profile = {};
          $state.go('app.tabs.tab3');
          /* vm.skills.resolve(res.data);
           res.data.forEach(function(skill){
           vm.skillsName.push(skill.name);

           });*/
        }, function (res) {
          console.log(res.data.message);
        });
      }
    }


    function profileclose() {
      vm.profileskills = [];
      vm.profilecertificate = [];
      vm.profileEducation = [];
      vm.profileEmployement = [];
      vm.profiledetial.name = '';
      vm.profiledetial.expecsal = '';
      vm.profiledetial.currentlocation = '';
      vm.primaryProfile = false;
    }

    function skillList() {

      vm.skills=$q.defer();

      var url=ApiUrl.url+'/api/skillcatalogues';

      $http.get(url).then(function(res) {
        vm.skills.resolve(res.data);
        res.data.forEach(function(skill){
          vm.skillsName.push(skill.name);

        });
      },function(res){
        console.log(res.data.message);
      });
    }



    /*get profiles list*/

    function getProfilesForCandidate() {
      vm.deferred=$q.defer();

      var url=ApiUrl.url+'/api/profiles';

      $http.get(url).then(function(res){
        vm.deferred.resolve(res.data);

        res.data.forEach(function(profile){
          vm.profiles.push(profile);

        });

        /*vm.isPrimaryProfileExist=true;

        res.data.forEach(function(job){
          if(job.jobApplicationStatus.isApplied===false)
          {
            vm.totalRecommendedJobs.push(job);

          }
          else if(job.jobApplicationStatus.isApplied===true)
          {
            vm.totalAppliedJobs.push(job);

          }

        });
        vm.totalaRecommendedCount=vm.totalRecommendedJobs.length;
        vm.totalAppliedCount=vm.totalAppliedJobs.length;*/



      },function(res){

        /*if(res.data.message==='No primary profile exist')
        {
          vm.isPrimaryProfileExist=false;
        }
        else
        {
          var Popup=$ionicPopup.show({
            title: 'Information',
            subTitle:res.data.message
          });

          $timeout(function() {
            Popup.close();
          }, 2000);
        }*/
        vm.deferred.reject(res.data.messsage);

      });

    }

    function saveskills(itemvalue) {

      if(itemvalue === 'skills') {
        if (!vm.skillName || !vm.releventExperience || !vm.expertiseLevel) {
          var Popup=$ionicPopup.show({
            title: 'Please fill skills details'
          });

          $timeout(function() {
            Popup.close();
          }, 2000);
          return false;
        } else {
          vm.error = null; // Remove error when fields are filled with values
        }
        if (!vm.profileskills) {
          vm.profileskills = [];
        }
        /// Pushing all values to skill array

        vm.profileskills.push({
          skillName: vm.skillName,
          releventExperience: vm.releventExperience,
          expertiseLevel: vm.expertiseLevel
        });
        vm.myTags.push(vm.skillName);
        vm.skillName = '';
        vm.releventExperience = '';
        vm.expertiseLevel = '';
        $state.go('profile.edit');
      }
      if(itemvalue === 'certificates') {
        if (!vm.certificationName || !vm.certificatonAuthority || !vm.licenseNumber) {
          var Popup=$ionicPopup.show({
            title: 'Please fill Certificate details'
          });

          $timeout(function() {
            Popup.close();
          }, 2000);
          return false;
        } else {
          vm.error = null; // Remove error when fields are filled with values
        }
        if (!vm.profilecertificate) {
          vm.profilecertificate = [];
        }
        /// Pushing all values to skill array

        vm.profilecertificate.push({
          certificationName: vm.certificationName,
          certificatonAuthority: vm.certificatonAuthority,
          licenseNumber: vm.licenseNumber,
          CertificationUrl: vm.CertificationUrl
        });
        vm.certificationName = '';
        vm.certificatonAuthority = '';
        vm.licenseNumber = '';
        vm.CertificationUrl = '';
        $state.go('profile.edit');
      }
      if(itemvalue === 'education') {
        if (!vm.degree || !vm.minscore || !vm.passedYear) {
          var Popup=$ionicPopup.show({
            title: 'Please fill Education details'
          });

          $timeout(function() {
            Popup.close();
          }, 2000);
          return false;
        } else {
          vm.error = null; // Remove error when fields are filled with values
        }
        if (!vm.profileEducation) {
          vm.profileEducation = [];
        }
        /// Pushing all values to skill array

        vm.profileEducation.push({
          degree: vm.degree,
          minscore: vm.minscore,
          passedYear: vm.passedYear
        });
        vm.degree = '';
        vm.minscore = '';
        vm.licenseNumber = '';
        vm.passedYear = '';
        $state.go('profile.edit');
      }
      if(itemvalue === 'employement') {
        if (!vm.companyName || !vm.lRole || !vm.previousExperience || !vm.previousSalary || !vm.fromDate || !vm.toDate) {
          var Popup=$ionicPopup.show({
            title: 'Please fill Employement details'
          });

          $timeout(function() {
            Popup.close();
          }, 2000);
          return false;
        } else {
          vm.error = null; // Remove error when fields are filled with values
        }
        if (!vm.profileEmployement) {
          vm.profileEmployement = [];
        }
        /// Pushing all values to skill array

        vm.profileEmployement.push({
          companyName: vm.companyName,
          lRole: vm.lRole,
          previousExperience: vm.previousExperience,
          previousSalary: vm.previousSalary,
          fromDate:vm.fromDate,
          toDate:vm.toDate
        });
        vm.companyName = '';
        vm.lRole = '';
        vm.licenseNumber = '';
        vm.previousExperience = '';
        vm.previousSalary = '';
        vm.fromDate = '';
        vm.toDate = '';
        $state.go('profile.edit');
      }

    }

    function removeing(profilevalue, index, itemvalue) {
      if(itemvalue === 'skills') {
        vm.profileskills.splice(index, 1);
      }
      if(itemvalue === 'certificates'){
        vm.profilecertificate.splice(index,1);
      }
      if(itemvalue === 'education'){
        vm.profileEducation.splice(index,1);
      }
      if(itemvalue === 'employement'){
        vm.profileEmployement.splice(index,1);
      }
    }

    function editrecord(profileskill, index, itemvalue){
      if(itemvalue === 'skills') {
        if (profileskill !== undefined) {
          vm.skillName = profileskill.skillName;
          vm.releventExperience = profileskill.releventExperience;
          vm.expertiseLevel = profileskill.expertiseLevel;
          vm.index = index;
          $state.go('profile.profileskills');
        }
      }
      if(itemvalue === 'certificates'){
        if (profileskill !== undefined) {
          vm.certificationName = profileskill.certificationName;
          vm.certificatonAuthority = profileskill.certificatonAuthority;
          vm.licenseNumber = profileskill.licenseNumber;
          vm.CertificationUrl = profileskill.CertificationUrl;
          vm.index = index;
          $state.go('profile.profilecertificates');
        }
      }
      if(itemvalue === 'education'){
        if (profileskill !== undefined) {
          vm.degree = profileskill.degree;
          vm.minscore = profileskill.minscore;
          vm.passedYear = profileskill.passedYear;
          vm.index = index;
          $state.go('profile.profileEducation');
        }
      }
      if(itemvalue === 'employement'){
        if (profileskill !== undefined) {
          vm.companyName = profileskill.companyName;
          vm.lRole = profileskill.lRole;
          vm.licenseNumber = profileskill.licenseNumber;
          vm.previousExperience = profileskill.previousExperience;
          vm.previousSalary = profileskill.previousSalary;
          vm.fromDate = profileskill.fromDate;
          vm.toDate = profileskill.toDate;
          vm.index = index;
          $state.go('profile.profileEmployment');
        }
      }
    }

    function updateSkill(index, itemvalue) {
      if(itemvalue === 'skills') {
        if (!vm.skillName || !vm.releventExperience || !vm.expertiseLevel) {
          var Popup=$ionicPopup.show({
            title: 'Please fill skills details'
          });

          $timeout(function() {
            Popup.close();
          }, 2000);
          return false;
        }
        vm.profileskills[index].skillName = vm.skillName;
        vm.profileskills[index].releventExperience = vm.releventExperience;
        vm.profileskills[index].expertiseLevel = vm.expertiseLevel;
        vm.skillName = '';
        vm.myTags[index] = vm.skillName;
        vm.releventExperience = '';
        vm.expertiseLevel = '';
        vm.index = '';
        $state.go('profile.edit');
      }
      if(itemvalue === 'certificates') {
        if (!vm.certificationName || !vm.certificatonAuthority || !vm.licenseNumber) {
          var Popup=$ionicPopup.show({
            title: 'Please fill skills details'
          });

          $timeout(function() {
            Popup.close();
          }, 2000);
          return false;
        }
        vm.profilecertificate[index].certificationName = vm.certificationName;
        vm.profilecertificate[index].certificatonAuthority = vm.certificatonAuthority;
        vm.profilecertificate[index].licenseNumber = vm.licenseNumber;
        vm.profilecertificate[index].CertificationUrl = vm.CertificationUrl;
        vm.certificationName = '';
        vm.certificatonAuthority = '';
        vm.licenseNumber = '';
        vm.CertificationUrl = '';
        vm.index = '';
        $state.go('profile.edit');
      }
      if(itemvalue === 'education') {
        if (!vm.degree || !vm.minscore || !vm.passedYear) {
          var Popup=$ionicPopup.show({
            title: 'Please fill skills details'
          });

          $timeout(function() {
            Popup.close();
          }, 2000);
          return false;
        }
        vm.profileEducation[index].degree = vm.degree;
        vm.profileEducation[index].minscore = vm.minscore;
        vm.profileEducation[index].passedYear = vm.passedYear;
        vm.degree = '';
        vm.minscore = '';
        vm.passedYear = '';
        vm.index = '';
        $state.go('profile.edit');
      }
      if(itemvalue === 'employement') {
        if (!vm.companyName || !vm.lRole || !vm.previousExperience || !vm.previousSalary || !vm.fromDate || !vm.toDate) {
          var Popup=$ionicPopup.show({
            title: 'Please fill skills details'
          });

          $timeout(function() {
            Popup.close();
          }, 2000);
          return false;
        }
        vm.profileEmployement[index].companyName = vm.companyName;
        vm.profileEmployement[index].lRole = vm.lRole;
        vm.profileEmployement[index].licenseNumber = vm.licenseNumber;
        vm.profileEmployement[index].previousExperience = vm.previousExperience;
        vm.profileEmployement[index].previousSalary = vm.previousSalary;
        vm.profileEmployement[index].fromDate = vm.fromDate;
        vm.profileEmployement[index].toDate = vm.toDate;
        vm.companyName = '';
        vm.lRole = '';
        vm.licenseNumber = '';
        vm.previousExperience = '';
        vm.previousSalary = '';
        vm.fromDate = '';
        vm.toDate = '';
        vm.index = '';
        $state.go('profile.edit');
      }

    }
    function backprofile(valueitem){
      if(valueitem === 'skills') {
        vm.skillName = '';
        vm.releventExperience = '';
        vm.expertiseLevel = '';
        vm.index = '';
      }
      if(valueitem === 'certificates'){
        vm.certificationName = '';
        vm.certificatonAuthority = '';
        vm.licenseNumber = '';
        vm.CertificationUrl = '';
        vm.index = '';
      }
      if(valueitem === 'education'){
        vm.degree = '';
        vm.minscore = '';
        vm.passedYear = '';
        vm.index = '';
      }
      if(valueitem === 'employement') {
        vm.companyName = '';
        vm.lRole = '';
        vm.licenseNumber = '';
        vm.previousExperience = '';
        vm.previousSalary = '';
        vm.fromDate = '';
        vm.toDate = '';
        vm.index = '';
      }
    }






    /*vm.cv_has_uploaded=false;
    vm.rating = {};
    vm.rating.rate = 3;
    vm.rating.max = 5;
    vm.check_if_required_field_filled=check_if_required_field_filled;
    vm.profile = profile;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;                               //remove function variable , deletes a profile
    vm.save = save;                                   // save function variable, creates a new profile
    vm.editRecord = editRecord;                       // edit function variable, edits individual categories
    vm.editRecord = editRecord;                       // edit function variable, edits individual categories
    vm.updateRecord = updateRecord;                   // update function variable, updates individual categories
    vm.addRecord = addRecord;                         // adds new category record
    vm.opendp = opendp;                               // date picker open function variable
    vm.disabled = disabled;                           // date picker disable funtion variable
    vm.removeRecord=removeRecord;                     // removes individual category records
    vm.nextpart=nextpart;                             // function variable for slide animation
    vm.manualupdate=manualupdate;                     // function variable for slide animation
    vm.backpartone=backpartone;                       // function variable for slide animation
    vm.backparttwo=backparttwo;                      // function variable for slide animation
    vm.checkedchange=checkedchange;
    vm.skillNamesarray1 = [];                         // array for storing skills
    vm.uploadProfilefile = uploadProfilefile;
    vm.doRecommendation=doRecommendation;
    vm.myTags=[];
    vm.percentcal=percentcal;
    vm.percentvalue=0;
    vm.cancelUpload=cancelUpload;
    vm.currentLocation=currentLocation;
    vm.preferedLocation=preferedLocation;
    vm._form_is_being_processed=false;
    vm.profileReviewed=profileReviewed;
    vm.goBack=goBack;



    vm.softwareroles = ['Data Analyst','Software Engineer','Supervisor for Help Desk center','Systems Analyst','Technical Writer','Network Technician',
    'Web Developer','C.A. Telephone Mgr','Datacenter Manager'];        // array for software roles

    vm.industrychange=['Gems and Jewellery','IT & ITeS','Automobiles','Infrastructure','Engineering','Education and Training','Science and Technology','Research & Developement'];                             //array for industry changes

    vm.profilelist = ProfilesService.query();
    vm.profilelist.$promise.then(function(){
      vm.percentvalue=vm.percentcal();


    });
    vm.listProfiles = listProfiles;
    vm.clickbtn = clickbtn;


    function profileReviewed(){

      if(vm.profile._id && !vm.profile.isReviewedByOps && vm.authentication.user.roles.indexOf('Operations')!== -1)
      {
        $http.post('/profileReviewed', { profileId: vm.profile._id }).then(function success(res) {
          vm.profile.isReviewedByOps=true;
          NotificationService.success('Profile will be marked as review');
        }, function error(res) {
          NotificationService.error(res.data.message);
        });
      }
    }







    function percentcal() {
      vm.count = 0;

      if (vm.profile.name && vm.profile.name.length) {
        vm.count += 1;
      }
      if (vm.profile.currentstatus && vm.profile.currentstatus.length) {
        vm.count += 1;
      }
      if (vm.profile.currentlocation && vm.profile.currentlocation.length) {
        vm.count += 1;
      }
      if (vm.profile.startnewDate && vm.profile.startnewDate.length) {
        vm.count += 1;
      }
      if (vm.profile.permanent===true || vm.profile.contract===true) {
        vm.count += 1;
      }
      if (vm.profile.expecsal && vm.profile.expecsal.length) {
        vm.count += 1;
      }
      if (vm.profile.preflocation && vm.profile.preflocation.length) {
        vm.count += 1;
      }


      if (vm.profile.profileFileURL && vm.profile.profileFileURL.length) {
        vm.count += 1;
      }
      if (vm.profile.mySkills && vm.profile.mySkills.length) {
        vm.count += 1;
      }
      if (vm.profile.myProjects && vm.profile.myProjects.length) {
        vm.count += 1;
      }
      if (vm.profile.myJobs && vm.profile.myJobs.length) {
        vm.count += 1;
      }
      if (vm.profile.myEducation && vm.profile.myEducation.length) {
        vm.count += 1;
      }
      if (vm.profile.myCertifications && vm.profile.myCertifications.length) {
        vm.count += 1;
      }




      vm.percentvalue = Math.floor((vm.count * 100) /13);
      vm.count = 0;
      return vm.percentvalue;

    }

    //auto complete skills function

    vm.loadSkills=loadSkills;
    vm.loadLocation=loadLocation;
    vm.skillNamesarray2 = [];

    vm.locationArray = [];

    // adding all skills to array for ng tags input autocomplete suggestion by using skillcatalogueservice query
    vm.skillnamearray = SkillcataloguesService.query({}).$promise.then(function (data) {
      // console.log(data)
      // success handler
      angular.forEach(data, function (narr) {
        vm.skillNamesarray2.push(narr.name);
      });

      console.log(vm.skillNamesarray2);
    }, function (error) {
      // error handler
    });

    function loadSkills($query) {
      var skillslist = vm.skillNamesarray2;
      return skillslist.filter(function (skillname) {

        return skillname.toLowerCase().indexOf($query.toLowerCase()) !== -1;
      });
    }


    LocationsService.query({}).$promise.then(function (data) {
      // console.log(data)
      // success handler
      angular.forEach(data, function (narr) {
        vm.locationArray.push(narr.name);
      });
    }, function (error) {
      // error handler
    });

    function loadLocation($query) {
      var locationlist = vm.locationArray;
      return locationlist.filter(function (location) {

        return location.toLowerCase().indexOf($query.toLowerCase()) !== -1;
      });
    }

    function check_if_required_field_filled()
    {
      if(vm.profile.currentstatus===undefined|| vm.profile.currentlocation===undefined ||vm.profile.startnewDate===undefined||vm.profile.name===undefined)
      {
        NotificationService.error('First four fields are mandatory for uploading CV');
        return;
      }
      else
        vm.uploadProfilefile();

    }
    function clickbtn(){
      vm.success=false;
      vm.error=false;
    }
    function goBack()
    {
      $state.go($state.previous.state.name|| 'profiles.list',$state.previous.params);

    }
    function listProfiles(){
      $state.go('profiles.list');
    }


    vm.options = {
      types: ['(cities)'],
      componentRestrictions: { country: 'IN' }
    };
    function currentLocation(){
      if(vm.profile.currentlocation !== undefined && vm.profile.currentlocation !== '')
        vm.profile.currentlocation=vm.profile.currentlocation.split(',')[0];
    }

    function preferedLocation() {
      vm.profile.preflocation = vm.profile.preflocation.split(',')[0];
    }

    /!*to recommend jobs for a candidate *!/

    function doRecommendation(profile)
    {

      $state.go('recommendations.recommendJob',{ 'profile':profile });
    }


    /////  Method to load skills array from skills module by using query method ////
    vm.skillnamearray = SkillcataloguesService.query({}).$promise.then(function (data) {
      // console.log(data)
      // success handler
      angular.forEach(data, function (narr) {
        vm.skillNamesarray1.push(narr.name);
      });
    }, function (error) {
      // error handler
    });

 //uploader code

    vm.user = Authentication.user;
    vm.fileURL = vm.profile.profileFileURL;
    vm.if_file_uploaded=false;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: '/profiles/upload/file',
      alias: 'newProfilefile',
      headers:{ 'x-access-token':Authentication.token }

    });

    // Set file uploader filter
    vm.uploader.filters.push({
      name: 'fileFilter',
      fn: function (item, options) {
        vm.profile.filepath=item.name;
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        //return '|doc|docx|txt|pdf|ppt|'.indexOf(type) !== -1;
        return 1;
      }
    });

    // Called after the user selected a new  file
    vm.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.fileURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };
    vm.uploader.onProgressItem = function (progress,fileItem) {
      console.log('onProgressItem', fileItem, progress);

    };

    // Called after the user has successfully uploaded a new picture
    vm.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      vm.profile.filepath='';
      // Show success message
      vm.if_file_uploaded=true;
      vm.successfile = 'File uploaded Successfully';
      vm.profile.profileFileURL=response;
      vm.cv_has_uploaded=true;


      // Clear upload buttons
      vm.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    vm.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      vm.cancelUpload();
      vm.successfile=false;
      console.log(response);
      NotificationService.error(response.message);
    };

    // Change user profile picture
    function uploadProfilefile() {
      // Clear messages
      vm.success = vm.error = null;
      // Start upload
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
      vm.fileURL = vm.profile.profileFileURL;
    }

    // Uploader code

    // Remove existing Profile
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.profile.$remove($state.go('profiles.list'));
      }
    }

    // Save Profile
    function save(isValid) {

      vm.profile.myTags=[];
      var tag;

      if(!vm.profile.name || !vm.profile.name.length)
      {
        NotificationService.error('Please fill Profile title.');
        return false;
      }

      if(!vm.profile.currentlocation || !vm.profile.currentlocation.length)
      {
        NotificationService.error('Please fill Current location.');
        return false;
      }



      if(!vm.profile.expecsal || !vm.profile.expecsal.length)
      {
        NotificationService.error('Please fill youe expected salary from new job.');
        return false;
      }

      if(vm.profile.mySkills && vm.profile.mySkills.length) {
        for (var index = 0; index < vm.profile.mySkills.length; index++) {
          var text = vm.profile.mySkills[index].skillName;
          vm.profile.myTags.push(text);
        }
      }
      else
      {
        NotificationService.error('Atleast one skill you have is required');
        return false;
      }


      if(vm.profile.prefarea && vm.profile.prefarea.length) {
        tag = vm.profile.prefarea.map(function (tag) {
          return tag.text;
        });
        vm.profile.prefarea = tag;
      }

      if (vm.profile._id) {
        vm._form_is_being_processed=true;
        vm.profile.$update(updatesuccessCallback, errorCallback);
      } else {
        if(vm.profilelist.length===0){
          vm.profile.primaryProfile = true;
        }
        vm._form_is_being_processed=true;
        vm.profile.$save(successCallback, errorCallback);

      }

      function successCallback(res) {
        vm._form_is_being_processed=false;
        NotificationService.success('Profile saved successfully');
        $state.go('dashboards.list');


      }
      function updatesuccessCallback(res) {
        vm._form_is_being_processed=false;


        NotificationService.success('Profile updated successfully');
        /!*$state.go('profiles.list', {
          profileId: res._id
        });*!/

      }
      function errorCallback(res) {
        vm._form_is_being_processed=false;
        console.log(res);
        NotificationService.error(res.data.message);
      }

    }

    //!************ add edit update record functions ************************!//
    // edit existing records function
    function editRecord(category, selectedRecord, id) {
      if (category === 'skill') {
        vm.index = id;
        vm.showskillsave=false;
        vm.skillsdiv = false;
        vm.skillName = selectedRecord.skillName;
        vm.releventExperience = selectedRecord.releventExperience;
        vm.expertiseLevel = selectedRecord.expertiseLevel;
        vm.expertiseLevelbyExpert = selectedRecord.expertiseLevelbyExpert;

      }
      if (category === 'project') {
        vm.proindex = id;
        vm.showprosave=false;
        vm.projectdiv = false;
        vm.projectName = selectedRecord.projectName;
        vm.projectRole = selectedRecord.projectRole;
        vm.startDate = selectedRecord.startDate;
        vm.endDate = selectedRecord.endDate;
        vm.projectDescription = selectedRecord.projectDescription;
      }
      if (category === 'previousjob') {
        vm.jobindex = id;
        vm.showjobsave=false;
        vm.isCollapsed = false;
        vm.companyName = selectedRecord.companyName;
        vm.lRole = selectedRecord.lRole;
        vm.fromDate = selectedRecord.fromDate;
        vm.toDate = selectedRecord.toDate;
        vm.previousExperience=selectedRecord.previousExperience;
        vm.previousSalary=selectedRecord.previousSalary;

      }
      if (category === 'education') {
        vm.eduindex = id;
        vm.showedusave=false;
        vm.educationdiv = false;
        vm.institute = selectedRecord.institute;
        vm.areaofExpertise = selectedRecord.areaofExpertise;
        vm.degree = selectedRecord.degree;
        vm.passedYear = selectedRecord.passedYear;
        vm.duration = selectedRecord.duration;
      }
      if (category === 'certificate') {
        vm.cerindex = id;
        vm.showcersave=false;
        vm.certificatediv = false;
        vm.certificationName = selectedRecord.certificationName;
        vm.certificatonAuthority = selectedRecord.certificatonAuthority;
        vm.licenseNumber = selectedRecord.licenseNumber;
        vm.CertificationUrl = selectedRecord.CertificationUrl;
      }
    }
    // updates existing records
    function updateRecord(category) {
      /!*jshint validthis: true *!/
      if (category === 'skill') {
        if(vm.authentication.user.roles.indexOf('Operations')===-1 && parseInt(vm.profile.mySkills[vm.index].expertiseLevelbyExpert)>0)
        {
          // if it is candidate and skill has been rated by expert then you not allowed to update this skills
          NotificationService.error('you can not update this skill after expert rating');
          this.skillName = '';
          this.releventExperience = '';
          this.expertiseLevel = '';
          this.expertiseLevelbyExpert='';
          vm.skillsdiv = true;
          vm.showskillsave=true;
          return;
        }
        vm.profile.mySkills[vm.index].skillName = this.skillName;
        vm.profile.mySkills[vm.index].releventExperience = this.releventExperience;
        vm.profile.mySkills[vm.index].expertiseLevel = this.expertiseLevel;
        vm.profile.mySkills[vm.index].expertiseLevelbyExpert = this.expertiseLevelbyExpert;

        this.skillName = '';
        this.releventExperience = '';
        this.expertiseLevel = '';
        this.expertiseLevelbyExpert='';
        vm.skillsdiv = true;
        vm.showskillsave=true;
      }
      if (category === 'project') {
        vm.profile.myProjects[vm.proindex].projectName = this.projectName;
        vm.profile.myProjects[vm.proindex].projectRole = this.projectRole;
        vm.profile.myProjects[vm.proindex].startDate = this.startDate;
        vm.profile.myProjects[vm.proindex].endDate = this.divcurrentproject ? Date.now() : this.endDate;
        vm.profile.myProjects[vm.proindex].projectDescription = this.projectDescription;
        this.projectName = '';
        this.startDate = '';
        this.endDate = '';
        this.projectRole = '';
        this.projectDescription = '';
        vm.projectdiv = true;
        vm.showprosave=true;
      }
      if (category === 'previousjob') {
        var todate=this.divcurrentjob ? Date.now() : this.toDate;
        if(new Date(this.fromDate)>new Date(todate))
        {
          NotificationService.error('fromDate can not be greater than toDate');// Throw error when nothing is entered in fields
          return;

        }

        if(!isInt(this.previousExperience))
        { NotificationService.error('Experience should be an integer');// Throw error when nothing is entered in fields
          return;

        }

        if(!isInt(this.previousSalary))
        { NotificationService.error('Salary should be an integer');// Throw error when nothing is entered in fields
          return;

        }

        vm.profile.myJobs[vm.jobindex].companyName = this.companyName;
        vm.profile.myJobs[vm.jobindex].lRole = this.lRole;
        vm.profile.myJobs[vm.jobindex].previousExperience = this.previousExperience;
        vm.profile.myJobs[vm.jobindex].previousSalary = this.previousSalary;
        vm.profile.myJobs[vm.jobindex].fromDate = this.fromDate;
        vm.profile.myJobs[vm.jobindex].toDate =this.divcurrentjob ? Date.now() : this.toDate;
        this.companyName = '';
        this.lRole = '';
        this.previousExperience = '';
        this.previousSalary = '';

        this.fromDate = '';
        this.toDate = '';

        vm.isCollapsed = true;
        vm.showjobsave=true;
      }
      if (category === 'education') {
        vm.profile.myEducation[vm.eduindex].institute = this.institute;
        vm.profile.myEducation[vm.eduindex].areaofExpertise = this.areaofExpertise;
        vm.profile.myEducation[vm.eduindex].degree = this.degree;
        vm.profile.myEducation[vm.eduindex].passedYear = this.passedYear;
        vm.profile.myEducation[vm.eduindex].duration = this.duration;
        this.institute = '';
        this.areaofExpertise = '';
        this.degree = '';
        this.passedYear = '';
        this.duration = '';
        vm.educationdiv = true;
        vm.showedusave=true;
      }
      if (category === 'certificate') {
        vm.profile.myCertifications[vm.cerindex].certificationName = this.certificationName;
        vm.profile.myCertifications[vm.cerindex].certificatonAuthority = this.certificatonAuthority;
        vm.profile.myCertifications[vm.cerindex].licenseNumber = this.licenseNumber;
        vm.profile.myCertifications[vm.cerindex].CertificationUrl = this.CertificationUrl;
        this.certificationName = '';
        this.certificatonAuthority = '';
        this.licenseNumber = '';
        this.CertificationUrl = '';
        vm.certificatediv = true;
        vm.showcersave=true;
      }

    }
    // adds new records
    function addRecord(category) {
      /!*jshint validthis: true *!/
      // method to add new record in skills
      if (category === 'skill') {
        if(!this.skillName || !this.releventExperience){
          NotificationService.error('Please fill all the skill details');// display error when nothing is entered in fields
          return;
        }

        if((vm.authentication.user.roles.indexOf('Operations')===-1 && !this.expertiseLevel)) {
          NotificationService.error('Please fill all the skill details');// display error when nothing is entered in fields
          return;
        }
        if((vm.authentication.user.roles.indexOf('Operations')!==-1 && !this.expertiseLevelbyExpert)) {
          NotificationService.error('Please fill all the skill details');// display error when nothing is entered in fields
          return;
        }

        if (!vm.profile.mySkills) {
          vm.profile.mySkills = [];
        }
        /// Pushing all values to skill array
        vm.profile.mySkills.push({
          skillName: this.skillName,
          releventExperience: this.releventExperience,
          expertiseLevel: this.expertiseLevel || this.expertiseLevelbyExpert,
          expertiseLevelbyExpert:this.expertiseLevelbyExpert || 0
        });


        vm.percentcal();

        // Empty the fields after pushing the values to arry
        this.skillName = '';
        this.releventExperience = '';
        this.expertiseLevel = '';
        this.expertiseLevelbyExpert='';
        //collapse skills div after adding a record
        vm.skillsdiv = true;
      }
      if (category === 'project') {
        // Method to add new record in  project
        if ((!this.projectName)||(!this.projectRole)|| (!this.startDate)||(!this.divcurrentproject && !this.endDate)) {
          NotificationService.error('Please fill all the project details');// Throw error when nothing is entered in fields
          return;
        }
        if (!vm.profile.myProjects) {
          vm.profile.myProjects = [];
        }
        // Pushing all values into array
        vm.profile.myProjects.push({
          projectName: this.projectName,
          projectRole: this.projectRole,
          startDate: this.startDate,
          endDate: this.divcurrentproject ? Date.now() : this.endDate,
          projectDescription: this.projectDescription
        });
        vm.percentcal();

        //Empty the fields after adding the values to array
        this.projectName = '';
        this.startDate = '';
        this.endDate = '';
        this.projectRole = '';
        this.projectDescription = '';

      }
      if (category === 'previousjob') {
        // Method to add new record in  Jobs
        //
        if ((!this.companyName)||(!this.lRole)||(!this.fromDate) || (!this.previousExperience) || (!this.previousSalary)||(!this.divcurrentjob && !this.toDate)) {

          NotificationService.error('Please fill all previous employment details');// Throw error when nothing is entered in fields
          return;
        }

        var todate=this.divcurrentjob ? Date.now() : this.toDate;
        if(new Date(this.fromDate)>new Date(todate))
        {
          NotificationService.error('fromDate can not be greater than toDate');// Throw error when nothing is entered in fields
          return;

        }

        if(!isInt(this.previousExperience))
        { NotificationService.error('Experience should be an integer');// Throw error when nothing is entered in fields
          return;

        }

        if(!isInt(this.previousSalary))
        { NotificationService.error('Salary should be an integer');// Throw error when nothing is entered in fields
          return;

        }



        if (!vm.profile.myJobs) {
          vm.profile.myJobs = [];
        }
        // Pushing all values into array
        vm.profile.myJobs.push({
          companyName: this.companyName,
          lRole: this.lRole,
          fromDate: this.fromDate,
          toDate: this.divcurrentjob ? Date.now() : this.toDate
        });
        vm.percentcal();

        //Empty the fields after adding the values to array
        this.companyName = '';
        this.lRole = '';
        this.fromDate = '';
        this.toDate = '';
        this.previousSalary = '';
        this.previousExperience = '';

      }
      if (category === 'education') {
        // Method to add new record in  education
        if (!this.institute || !this.areaofExpertise|| !this.degree ||!this.passedYear||!this.duration) {
          NotificationService.error('Please fill all the educationsal details');// Throw error when nothing is entered in fields
          return;

        }


        if(Number(this.passedYear)> new Date().getFullYear()) {
          NotificationService.error('Passed year can not go beyond the current year');
          return;

        }

        if(Number(this.passedYear)< 1950) {
          NotificationService.error('Passed year can not be less than 1950');
          return;

        }


        if (!vm.profile.myEducation) {
          vm.profile.myEducation = [];
        }
        // Pushing all values into array
        vm.profile.myEducation.push({
          institute: this.institute,
          areaofExpertise: this.areaofExpertise,
          degree: this.degree,
          passedYear: this.passedYear,
          duration: this.duration
        });
        vm.percentcal();

        //Empty the fields after adding the values to array
        this.institute = '';
        this.areaofExpertise = '';
        this.degree = '';
        this.passedYear = '';
        this.duration = '';
      }
      if (category === 'certificate') {
        // Method to add new record in  certification
        if (!this.certificationName || !this.certificatonAuthority || !this.licenseNumber || !this.CertificationUrl) {
          NotificationService.error('Please fill all the certificate details');// Throw error when nothing is entered in fields
          return;

        }

        if (!vm.profile.myCertifications) {
          vm.profile.myCertifications = [];
        }
        // Pushing all values into array
        vm.profile.myCertifications.push({
          certificationName: this.certificationName,
          certificatonAuthority: this.certificatonAuthority,
          licenseNumber: this.licenseNumber,
          CertificationUrl: this.CertificationUrl
        });
        vm.percentcal();

        //Empty the fields after adding the values to array
        this.certificationName = '';
        this.certificatonAuthority = '';
        this.licenseNumber = '';
        this.CertificationUrl = '';
      }
    }
    //removes existing records
    function removeRecord(category,record){

      // Removes skill record on clicking delete button
      vm.form.profileForm.$pristine=false;
      if(category==='skill'){
        vm.showskillsave=true; //changes update button to add button
        vm.profile.mySkills.splice(vm.profile.mySkills.indexOf(record), 1);
      }
      // Removes Project record on clicking delete button
      if(category==='project'){
        vm.showprosave=true;  //changes update button to add button
        vm.profile.myProjects.splice(vm.profile.myProjects.indexOf(record), 1);
      }
      // Removes Job record on clicking delete button
      if(category==='job'){
        vm.showjobsave=true;   //changes update button to add button
        vm.profile.myJobs.splice(vm.profile.myJobs.indexOf(record), 1);
      }
      // Removes education record on clicking delete button
      if(category==='education'){
        vm.showedusave=true;    //changes update button to add button
        vm.profile.myEducation.splice(vm.profile.myEducation.indexOf(record), 1);
      }
      // Removes certificate record on clicking delete button
      if(category==='certificate'){
        vm.showcersave=true;   //changes update button to add button
        vm.profile.myCertifications.splice(vm.profile.myCertifications.indexOf(record), 1);
      }

    }

    //!************ add edit skill functions ************************!//
    /// *********** date picker functions  *************************!//

    // deisbale weekend selection
    function disabled(date, mode) {

      return mode === 'day' && (date.getDay() === -1 || date.getDay() === 7);
    }

    //$scope.maxDate = new Date();


    function opendp($event, opened) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope[opened] = true;
    }

    vm.dateOptions = {
      'year-format': 'yy',
      'starting-day': 1
    };

    //// ****************8 end of date picker functions**************8//
    // ************  slide animation effects for profiledetails *****!//
    function nextpart() {
      if(vm.profile._id){
        if((vm.profile.profileFileURL)&&(vm.profile.profileFileURL!=='')){
          vm.myval='person-leave person-leave-active';
          vm.myval1='person-enter person-enter-active';
        }
        else{
          vm.myval='person-leave person-leave-active';
          vm.myval2='person-enter person-enter-active';
        }
      }else{
        vm.myval='person-leave person-leave-active';
        vm.myval1='person-enter person-enter-active';
      }

      //$scope.myValue1=false;
    }
    function manualupdate() {
      vm.myval1='person-leave person-leave-active';
      vm.myval2='person-enter person-enter-active';
      //$scope.myValue1=false;
    }
    function backpartone() {
      vm.myval='person-enter person-enter-active';
      vm.myval1='person-enter';
      vm.success=false;
      vm.error=false;
    }
    function backparttwo() {
      if (vm.profile._id !== undefined) {
        vm.myval2 = 'person-leave person-leave-active';
        vm.myval = 'person-enter person-enter-active';

      } else {
        vm.myval1 = 'person-enter person-enter-active';
        vm.myval2 = 'person-enter';
      }
    }

    function checkedchange(){
      var checkval;
      var profileid;
      for (var index = 0; index < vm.profilelist.length; index++) {
        if(vm.profilelist[index].primaryProfile){
          checkval=vm.profilelist[index].primaryProfile;
          profileid=vm.profilelist[index]._id;
          console.log(checkval);
          console.log(profileid);
          console.log(vm.profile._id);
        }
      }
      if(!vm.profile.primaryProfile && vm.profile._id !== undefined){
        if(checkval && vm.profile._id===profileid) {
          NotificationService.info('One primary profile should be there.');
          vm.profile.primaryProfile=true;
        }
      }
    }

    function isInt(value) {
      return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value));

    }*/


  }
})();

